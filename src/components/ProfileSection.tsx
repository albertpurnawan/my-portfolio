import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { useProfileStore } from '../stores/profileStore';

const ProfileSection = () => {
  const { profile } = useProfileStore();

  return (
    <section id="profile" className="min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Profile Image */}
          <div className="flex-shrink-0 animate-fade-in pt-16">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-portfolio-accent to-purple-500 p-2">
                <img
                  src={profile.profileImage}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center lg:text-left animate-slide-in">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              <span className="text-portfolio-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:bg-clip-text hover:text-transparent transition-colors">{profile.name.split(' ')[0]} {profile.name.split(' ')[1]}</span>
              <br />
              <span className="text-portfolio-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:bg-clip-text hover:text-transparent transition-colors">{profile.name.split(' ').slice(2).join(' ')}</span>
            </h1>
            
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <MapPin size={20} className="text-portfolio-accent" />
              <span className="text-portfolio-muted hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:bg-clip-text hover:text-transparent transition-colors">{profile.location}</span>
            </div>

            <p className="text-xl text-portfolio-muted mb-8 max-w-2xl hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:bg-clip-text hover:text-transparent transition-colors">
              {profile.description}
            </p>

            <div className="flex justify-center lg:justify-start gap-6 mb-8">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 px-6 py-3 border border-portfolio-accent text-portfolio-accent rounded-lg hover:bg-portfolio-accent hover:text-white transition-colors hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500"
              >
                <Mail size={20} />
                Contact Me
              </a>
              
              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3 border border-portfolio-accent text-portfolio-accent rounded-lg hover:bg-portfolio-accent hover:text-white transition-colors hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500"
              >
                View Work
              </a>
            </div>

            <div className="flex justify-center lg:justify-start gap-4 pb-16">
              <a
                href={profile.github}
                className="w-12 h-12 bg-portfolio-navy rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href={profile.linkedin}
                className="w-12 h-12 bg-portfolio-navy rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 transition-colors"
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
