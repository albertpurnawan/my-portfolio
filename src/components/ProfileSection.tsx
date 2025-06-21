
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';

const ProfileSection = () => {
  return (
    <section id="profile" className="min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Profile Image */}
          <div className="flex-shrink-0 animate-fade-in">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-portfolio-accent to-purple-500 p-2">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-portfolio-accent rounded-full flex items-center justify-center">
                <span className="text-2xl">👋</span>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center lg:text-left animate-slide-in">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              <span className="gradient-text">Jonathan Robert</span>
              <br />
              <span className="text-portfolio-text">Parlaungan</span>
            </h1>
            
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <MapPin size={20} className="text-portfolio-accent" />
              <span className="text-portfolio-muted">Jakarta, Indonesia</span>
            </div>

            <p className="text-xl text-portfolio-muted mb-8 max-w-2xl">
              Software Engineer passionate about creating innovative web solutions. 
              Experienced in full-stack development with expertise in modern frameworks 
              and technologies.
            </p>

            <div className="flex justify-center lg:justify-start gap-6 mb-8">
              <a
                href="mailto:jonathan@example.com"
                className="flex items-center gap-2 px-6 py-3 bg-portfolio-accent text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Mail size={20} />
                Contact Me
              </a>
              
              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3 border border-portfolio-accent text-portfolio-accent rounded-lg hover:bg-portfolio-accent hover:text-white transition-colors"
              >
                View Work
              </a>
            </div>

            <div className="flex justify-center lg:justify-start gap-4">
              <a
                href="https://github.com"
                className="w-12 h-12 bg-portfolio-navy rounded-lg flex items-center justify-center hover:bg-portfolio-accent transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                className="w-12 h-12 bg-portfolio-navy rounded-lg flex items-center justify-center hover:bg-portfolio-accent transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
