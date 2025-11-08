
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { useExperienceStore } from '@/stores/experienceStore';

const ExperienceSection = () => {
  const { experiences: storeExperiences } = useExperienceStore();

  const education = [
    {
      degree: 'Bachelor of Computer Science',
      school: 'Bina Nusantara University',
      period: 'Sep 2019 – Apr 2023',
      gpa: 'GPA: 3.44 / 4.00 — Graduated in 3.5 years; KMK activist; Internship at PT Mayora Indah Tbk'
    },
    {
      degree: 'Full-Stack Web Development Bootcamp',
      school: 'Binar Academy',
      period: 'Mar 2021 – Oct 2021',
      gpa: 'Rated “Very Good” (4.6/5) in Hard Skills'
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
              {storeExperiences.map((exp, index) => (
                <div key={index} className="bg-portfolio-navy p-6 rounded-xl border border-portfolio-blue card-hover animate-slide-in">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <h3 className="text-xl font-bold text-portfolio-text">{exp.position}</h3>
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

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-portfolio-text">Job Details:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-portfolio-muted">
                      {exp.description.map((desc, idx) => (
                        <li key={idx}>{desc}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-portfolio-text">Key Achievements:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-portfolio-muted">
                      {exp.achievements?.map((achievement, idx) => (
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
                <div key={index} className="bg-portfolio-navy p-6 mb-10 rounded-xl border border-portfolio-blue">
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
                    { skill: 'React Native', level: '90%' },
                    { skill: 'Flutter', level: '90%' },
                    { skill: 'Node.js', level: '90%' },
                    { skill: 'TypeScript', level: '85%' },
                    { skill: 'Python', level: '80%' },
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
