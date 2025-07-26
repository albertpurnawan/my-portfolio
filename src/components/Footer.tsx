
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-portfolio-navy border-t border-portfolio-blue">
      <div className="max-w-7xl mx-auto section-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Jonathan Albert Purnawan
            </h3>
            <p className="text-portfolio-muted mb-4">
              Full Stack Developer passionate about creating innovative web solutions 
              and building amazing user experiences.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/albertpurnawan?tab=repositories"
                className="w-10 h-10 bg-portfolio-dark rounded-lg flex items-center justify-center hover:bg-portfolio-accent transition-colors"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/albertpurnawan/"
                className="w-10 h-10 bg-portfolio-dark rounded-lg flex items-center justify-center hover:bg-portfolio-accent transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:albertpurnawan1@gmail.com"
                className="w-10 h-10 bg-portfolio-dark rounded-lg flex items-center justify-center hover:bg-portfolio-accent transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-portfolio-text mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['Profile', 'About', 'Experience', 'Projects'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-portfolio-muted hover:text-portfolio-accent transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-portfolio-text mb-4">
              Services
            </h4>
            <ul className="space-y-2 text-portfolio-muted">
              <li>Web Development</li>
              <li>Mobile Apps</li>
              <li>UI/UX Design</li>
              <li>Consulting</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-portfolio-blue mt-8 pt-8 text-center">
          <p className="text-portfolio-muted flex items-center justify-center gap-2">
            Made by Jonathan Albert Purnawan
          </p>
          <p className="text-portfolio-muted text-sm mt-2">
            © 2024 All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
