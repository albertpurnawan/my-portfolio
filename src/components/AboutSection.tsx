
import { Code } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useAboutStore } from '@/stores/aboutStore';

const AboutSection = () => {
  const { skills, stats } = useAboutStore();
  const renderIcon = (name?: string) => {
    if (!name) return <Code size={24} />;
    const IconComp = (LucideIcons as unknown)[name];
    try {
      return IconComp ? <IconComp size={24} /> : <Code size={24} />;
    } catch {
      return <Code size={24} />;
    }
  };

  return (
    <section id="about" className="py-20 bg-portfolio-navy/50">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-portfolio-muted max-w-3xl mx-auto">
            I'm a passionate software engineer with over 3 years of experience building 
            scalable web applications and mobile solutions. I love turning complex problems 
            into simple, beautiful designs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="animate-slide-in">
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=600&fit=crop"
              alt="About me"
              className="rounded-2xl w-full h-96 object-cover"
            />
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-portfolio-dark p-6 rounded-xl border border-portfolio-blue hover:border-portfolio-accent transition-colors card-hover"
              >
                <div className="text-portfolio-accent mb-4">{renderIcon(skill.icon)}</div>
                <h3 className="text-lg font-semibold mb-2 text-portfolio-text">
                  {skill.title}
                </h3>
                <p className="text-portfolio-muted text-sm mb-3">
                  {skill.description}
                </p>
                <span className="text-portfolio-accent text-sm font-medium">
                  {skill.projects}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 animate-fade-in">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-portfolio-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
