
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

const ExperienceSection = () => {
  const experiences = [
    {
      title: 'Mobile Developer',
      company: 'PT Bank CIMB Niaga Tbk',
      location: 'Tangerang, Indonesia',
      period: 'Feb 2025 – Present',
      description: [
        'Improved the Arjuna HRMS Mobile App used by 10,000+ employees and 200+ active daily users within a cross-functional team of 12.',
        'Refactored legacy code into Flutter Clean Architecture, improving performance and reducing bug re-occurrence by 45%.',
        'Implemented Unit, Widget, and Integration Tests with ~75% coverage, reducing regression incidents by ~60%.',
        'Built automated Jenkins pipelines for mobile deployment, cutting manual release effort by ~70%.',
        'Designed mobile-backend sync architecture, reducing API inconsistencies and improving request handling by ~30%.'
      ],
      achievements: [
        '45% fewer recurring bugs via Clean Architecture refactor.',
        '~75% test coverage and ~60% fewer regressions.',
        '~70% reduction in manual release effort with Jenkins.',
        '~30% improvement in request handling efficiency.'
      ]
    },
    {
      title: 'Senior Full-Stack Developer',
      company: 'PT BeOne Optima Solusi',
      location: 'Tangerang, Indonesia',
      period: 'Nov 2024 – Feb 2025',
      description: [
        'Led a 6-person team delivering ERP and POS systems for 100+ users handling 500+ daily transactions across retail sites.',
        'Delivered BeOne BI (Laravel + React Native + PostgreSQL), cutting report generation time by ~50% via optimized SQL and async pipelines.',
        'Built POS systems (Flutter, Bloc, SQLite) with offline-first capabilities, improving task completion rate by ~35%.',
        'Refactored monolithic backends into microservices (Go + TypeScript), improving modular scalability.',
        'Migrated infrastructure to Alibaba Cloud, achieving ~99.9% uptime and reducing deployment time from ~20 min to ~5 min.',
        'Set up CI/CD (Jenkins + Docker) with automated tests, increasing deployment frequency by ~80%.',
        'Mentored junior developers and led code reviews to improve productivity and code quality.'
      ],
      achievements: [
        '~50% faster reporting in BeOne BI.',
        '~35% improvement in POS task completion.',
        '~80% increase in deployment frequency with CI/CD.',
        '~99.9% uptime post-cloud migration.'
      ]
    },
    {
      title: 'Software Developer (Backend Focus)',
      company: 'PT Agile Technica',
      location: 'Tangerang, Indonesia',
      period: 'Nov 2023 – Nov 2024',
      description: [
        'Maintained ERP systems (100+ users, 1,000+ daily transactions) within a small cross-functional team.',
        'Enhanced ERP modules (HR, Helpdesk, LMS, Accounting) on Python Frappe, boosting query efficiency by ~45% via indexing, cron jobs, and queue refactor.',
        'Automated deployments using Docker and Kubernetes on AWS, improving deployment success rate by ~80%.',
        'Implemented task schedulers and scaling logic, reducing data sync delays from ~30s to ~10s during peak usage.',
        'Set up backend observability dashboards, improving incident response time by ~60%.'
      ],
      achievements: [
        '~45% query efficiency improvements across ERP modules.',
        '~80% deployment success rate with Docker/Kubernetes.',
        'Data sync delay reduced from ~30s to ~10s.',
        '~60% faster incident response via observability.'
      ]
    },
    {
      title: 'Technical Solution Architect',
      company: 'PT Mastersystem Infotama',
      location: 'Jakarta, Indonesia',
      period: 'Jun 2023 – Sep 2023',
      description: [
        'Designed enterprise solutions for financial clients with a team of Cloud Engineers and PMs.',
        'Architected facial-recognition attendance using AWS Rekognition and third-party OCR APIs, reducing manual validation effort by ~50%.',
        'Built NLP-based social media sentiment analysis via AWS Comprehend for 10,000+ daily mentions, cutting manual review time by ~60%.',
        'Delivered technical documentation, deployment diagrams, and validation reports for handover.',
        'Integrated cloud services into client systems, improving detection accuracy and API stability.'
      ],
      achievements: [
        '~50% faster authentication with face recognition system.',
        '~60% reduction in manual review time with NLP.',
        'Improved detection accuracy and API stability.'
      ]
    },
    {
      title: 'Application Developer Intern',
      company: 'PT Mayora Indah Tbk',
      location: 'Jakarta, Indonesia',
      period: 'Feb 2022 – Feb 2023',
      description: [
        'Supported the Finance division (100+ users, up to 1,000 daily transactions) as a Full-Stack Developer.',
        'Developed and maintained 7+ internal finance and tax apps using Java Spring Boot, JavaScript, Flutter, and MariaDB, integrated with SAP.',
        'Optimized backend performance via B-Tree indexing and query refactoring, achieving ~70% faster response times.',
        'Refactored frontend architecture and state management, introducing lazy loading and skeleton UI to reduce initial render time by ~35%.',
        'Collaborated with stakeholders to test and deploy production releases.'
      ],
      achievements: [
        'Built and maintained 7+ internal apps.',
        '~70% faster backend responses via optimization.',
        '~35% faster initial render with frontend refactor.'
      ]
    }
  ];

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
