
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

const ExperienceSection = () => {
  const experiences = [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Innovations Inc.',
      location: 'Jakarta, Indonesia',
      period: '2022 - Present',
      description: 'Lead development of scalable web applications using React, Node.js, and cloud technologies. Mentor junior developers and implement best practices.',
      achievements: [
        'Led team of 5 developers',
        'Increased app performance by 40%',
        'Implemented CI/CD pipelines'
      ]
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Solutions Ltd.',
      location: 'Jakarta, Indonesia', 
      period: '2020 - 2022',
      description: 'Developed and maintained multiple client projects using modern web technologies. Collaborated with design teams to create user-friendly interfaces.',
      achievements: [
        'Built 15+ client projects',
        'Reduced load times by 30%',
        'Integrated payment systems'
      ]
    },
    {
      title: 'Frontend Developer',
      company: 'StartupXYZ',
      location: 'Jakarta, Indonesia',
      period: '2019 - 2020',
      description: 'Created responsive web applications and mobile-first designs. Worked closely with UX/UI designers to implement pixel-perfect designs.',
      achievements: [
        'Launched 3 major products',
        'Improved user engagement by 25%',
        'Optimized mobile experience'
      ]
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Computer Science',
      school: 'University of Indonesia',
      period: '2015 - 2019',
      gpa: 'GPA: 3.8/4.0'
    }
  ];

  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            My <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-xl text-portfolio-muted max-w-3xl mx-auto">
            A journey through my professional career and educational background
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Experience Timeline */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-8 text-portfolio-text">Work Experience</h3>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="bg-portfolio-navy p-6 rounded-xl border border-portfolio-blue card-hover animate-slide-in">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <h3 className="text-xl font-bold text-portfolio-text">{exp.title}</h3>
                    <div className="flex items-center gap-2 text-portfolio-accent text-sm">
                      <Calendar size={16} />
                      {exp.period}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-portfolio-accent font-medium">{exp.company}</span>
                    <ArrowRight size={16} className="text-portfolio-muted" />
                    <div className="flex items-center gap-1 text-portfolio-muted">
                      <MapPin size={16} />
                      {exp.location}
                    </div>
                  </div>

                  <p className="text-portfolio-muted mb-4">{exp.description}</p>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-portfolio-text">Key Achievements:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-portfolio-muted">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Skills */}
          <div className="space-y-8">
            {/* Education */}
            <div className="animate-fade-in">
              <h3 className="text-2xl font-bold mb-6 text-portfolio-text">Education</h3>
              {education.map((edu, index) => (
                <div key={index} className="bg-portfolio-navy p-6 rounded-xl border border-portfolio-blue">
                  <h4 className="text-lg font-bold text-portfolio-text mb-2">{edu.degree}</h4>
                  <p className="text-portfolio-accent mb-2">{edu.school}</p>
                  <div className="flex items-center gap-2 text-sm text-portfolio-muted mb-2">
                    <Calendar size={16} />
                    {edu.period}
                  </div>
                  <p className="text-sm text-portfolio-accent">{edu.gpa}</p>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="animate-fade-in">
              <h3 className="text-2xl font-bold mb-6 text-portfolio-text">Core Skills</h3>
              <div className="bg-portfolio-navy p-6 rounded-xl border border-portfolio-blue">
                <div className="space-y-4">
                  {[
                    { skill: 'React/Vue.js', level: '95%' },
                    { skill: 'Node.js', level: '90%' },
                    { skill: 'TypeScript', level: '85%' },
                    { skill: 'Database Design', level: '80%' },
                    { skill: 'Cloud Services', level: '75%' }
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-portfolio-text">{item.skill}</span>
                        <span className="text-portfolio-accent">{item.level}</span>
                      </div>
                      <div className="h-2 bg-portfolio-dark rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-portfolio-accent to-purple-500 rounded-full transition-all duration-1000"
                          style={{ width: item.level }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
