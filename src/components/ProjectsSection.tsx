
import { ExternalLink, Github, Calendar, Eye, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useProjectStore } from '../stores/projectStore';
import type { Project } from '@/stores/projectStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const ProjectsSection = () => {
  const { projects, updateProjects } = useProjectStore();
  const categories = ['All', 'Full Stack', 'Frontend', 'Mobile', 'Backend'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [previewProject, setPreviewProject] = useState<Project | null>(null);

  useEffect(() => {
    // Load from API
    const load = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        updateProjects(data);
      } catch (e) {
        // ignore
      }
    };
    load();
  }, [updateProjects]);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="py-20 bg-portfolio-navy/50">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-portfolio-muted max-w-3xl mx-auto">
            A showcase of my recent work and projects that demonstrate my skills and creativity
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? 'bg-portfolio-accent text-white'
                  : 'bg-portfolio-navy text-portfolio-text hover:bg-portfolio-blue'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className="bg-portfolio-dark rounded-xl overflow-hidden border border-portfolio-blue card-hover animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-portfolio-accent text-white px-3 py-1 rounded-full text-sm">
                  {project.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-portfolio-muted text-sm mb-3">
                  <Calendar size={16} />
                  {project.date}
                </div>

                <h3 className="text-xl font-bold text-portfolio-text mb-3">
                  {project.title}
                </h3>

                <p className="text-portfolio-muted mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-portfolio-navy text-portfolio-accent text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                  <button
                    onClick={() => setPreviewProject(project)}
                    className="flex items-center gap-2 text-portfolio-muted hover:text-portfolio-accent transition-colors"
                  >
                    <Eye size={16} />
                    <span className="text-sm">Preview</span>
                  </button>
                  {(!('showGithub' in project) || project.showGithub) && project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-portfolio-muted hover:text-portfolio-accent transition-colors"
                    >
                      <Github size={16} />
                      <span className="text-sm">Code</span>
                    </a>
                  )}
                  {project.github && (
                    <button
                      onClick={() => navigator.clipboard.writeText(project.github)}
                      className="flex items-center gap-2 text-portfolio-muted hover:text-portfolio-accent transition-colors"
                      title="Copy code link"
                    >
                      <Copy size={16} />
                      <span className="text-sm">Copy</span>
                    </button>
                  )}
                  {(!('showDemo' in project) || project.showDemo) && project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-portfolio-muted hover:text-portfolio-accent transition-colors"
                    >
                      <ExternalLink size={16} />
                      <span className="text-sm">Demo</span>
                    </a>
                  )}
                  {project.demo && (
                    <button
                      onClick={() => navigator.clipboard.writeText(project.demo)}
                      className="flex items-center gap-2 text-portfolio-muted hover:text-portfolio-accent transition-colors"
                      title="Copy demo link"
                    >
                      <Copy size={16} />
                      <span className="text-sm">Copy</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Dialog open={!!previewProject} onOpenChange={(open) => !open && setPreviewProject(null)}>
          <DialogContent className="sm:max-w-3xl">
            {previewProject && (
              <div>
                <DialogHeader>
                  <DialogTitle>{previewProject.title}</DialogTitle>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                  {previewProject.embedUrl ? (
                    <div className="w-full h-[500px] rounded-md overflow-hidden border border-portfolio-blue">
                      <iframe src={previewProject.embedUrl} className="w-full h-full" title="Project Preview" />
                    </div>
                  ) : (
                    <img src={previewProject.image} alt={previewProject.title} className="w-full h-64 object-cover rounded-md" />
                  )}
                  <p className="text-sm text-portfolio-muted">{previewProject.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {previewProject.tech?.map((t: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-portfolio-navy text-portfolio-accent text-xs rounded-full">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {(!('showGithub' in previewProject) || previewProject.showGithub) && previewProject.github && (
                      <a href={previewProject.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-portfolio-muted hover:text-portfolio-accent">
                        <Github size={16} /> <span className="text-sm">Code</span>
                      </a>
                    )}
                    {(!('showDemo' in previewProject) || previewProject.showDemo) && previewProject.demo && (
                      <a href={previewProject.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-portfolio-muted hover:text-portfolio-accent">
                        <ExternalLink size={16} /> <span className="text-sm">Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ProjectsSection;
