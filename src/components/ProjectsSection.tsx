
import { ExternalLink, Github, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useProjectStore } from '../stores/projectStore';

const ProjectsSection = () => {
  const { projects } = useProjectStore();
  const categories = ['All', 'Full Stack', 'Frontend', 'Mobile', 'Backend'];
  const [activeCategory, setActiveCategory] = useState('All');

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

                <div className="flex gap-4">
                  <a
                    href={project.github}
                    className="flex items-center gap-2 text-portfolio-muted hover:text-portfolio-accent transition-colors"
                  >
                    <Github size={16} />
                    <span className="text-sm">Code</span>
                  </a>
                  <a
                    href={project.demo}
                    className="flex items-center gap-2 text-portfolio-muted hover:text-portfolio-accent transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span className="text-sm">Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
