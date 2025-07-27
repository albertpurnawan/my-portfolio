
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

const ExperienceSection = () => {
  const experiences = [
    {
      title: 'Cipta IT Developer',
      company: 'PT. Bank CIMB Niaga Tbk',
      location: 'Tangerang, Indonesia',
      period: 'Feb 2025 – Present',
      description: [
        'Overhauled the mobile interface of the Arjuna project, modernizing numerous features ranging from Icons and Themes to Attendance Progress to deliver a more intuitive and cohesive user experience.',
        'Refactored core logic to increase efficiency and flexibility, while reorganizing the file structure to promote clarity, scalability, and adherence to clean code principles.',
        'Worked collaboratively with QA, UI/UX, backend, and project management teams to ensure the redesigned mobile interface met functional, aesthetic, and performance standards.'
      ],
      achievements: [
        'Successfully modernized Arjuna mobile UI for improved user experience.',
        'Refactored and reorganized codebase for scalability and maintainability.',
        'Ensured cross-team collaboration for high-quality deliverables.'
      ]
    },
    {
      title: 'Senior Fullstack Developer',
      company: 'PT. Beone Optima Solusi',
      location: 'Tangerang, Indonesia',
      period: 'Nov 2024 – Feb 2025',
      description: [
        'Developed POS frontend systems for SESA and Topgolf projects using Flutter (Bloc) and SQLite, supporting modules such as Sales, Shift, Reports, Stock, MOP Adjustment, and Settings with offline-first capabilities.',
        'Architected and implemented full ERP solutions with modules including Dashboard, Admin, Master Data, Sales, Purchase, Inventory, Promotion, Finance, and Reporting using PHP Laravel and SQLite.',
        'Built and launched BeOne BI, a financial reporting platform using PHP Laravel (web) and React Native (mobile), handling complex multi-dimensional data via PostgreSQL.',
        'Designed and integrated RESTful APIs for seamless communication between frontend and backend systems, improving data consistency and reliability.',
        'Deployed scalable cloud-native applications to Alibaba Cloud, leveraging cloud tools for high performance and security.',
        'Automated deployment workflows using CI/CD pipelines, improving release frequency and reducing human error during deployment.',
        'Containerized projects with Docker, enabling standardized development environments and simplified deployment pipelines.',
        'Conducted comprehensive testing using Unit Testing and Postman to ensure code reliability and system robustness.',
        'Acted as technical lead for multiple projects by conducting code reviews for junior developers to ensure code quality and maintain best practices.',
        'Guided and mentored junior developers throughout the software development lifecycle.',
        'Delivered project progress and updates directly to internal stakeholders, aligning development with business needs.',
        'Evaluated and selected tech stacks based on project requirements, balancing performance, scalability, and team capabilities.',
        'Maintained and optimized legacy codebases, improving system stability, scalability, and long-term maintainability.'
      ],
      achievements: [
        'Boosted POS user task efficiency by 35% through streamlined UI/UX flows and offline functionality.',
        'Reduced report generation time in BeOne BI by over 50% with optimized SQL queries and asynchronous data processing.',
        'Achieved 80% increase in deployment success rate through fully automated CI/CD and Docker integration.',
        'Maintained 99.9% system uptime post-cloud migration to Alibaba Cloud with improved scaling and monitoring strategies.'
      ]
    },
    {
      title: 'Software Developer',
      company: 'PT. Sumber Inovasi Informatika',
      location: 'Tangerang, Indonesia',
      period: 'Nov 2023 – Nov 2024',
      description: [
        'Led backend development for two ERP platforms (Unirama & Central SPS) using Frappe and Python, covering modules such as HR, Helpdesk, LMS, Stock, and Accounting for 100+ daily users.',
        'Developed and integrated RESTful APIs to ensure seamless data exchange between frontend and third-party services, reducing sync latency by 40%.',
        'Optimized MariaDB queries and backend performance to significantly reduce response times across all modules.',
        'Automated CI/CD pipelines and containerized applications using Docker, enabling consistent deployments across Frappe Cloud and AWS EC2 environments.',
        'Contributed to system stability through rigorous unit testing and API testing, ensuring reliable feature releases with minimal downtime.'
      ],
      achievements: [
        'Reduced sync latency by 40% through API integration.',
        'Significantly improved backend response times with query optimization.',
        'Enabled consistent deployments via Docker and CI/CD automation.'
      ]
    },
    {
      title: 'Technical Solution Architect',
      company: 'PT. Mastersystem Infotama',
      location: 'Jakarta, Indonesia',
      period: 'Jun 2023 - Sep 2023',
      description: [
        'Designed and delivered an NLP-based solution for real-time sentiment analysis across multiple social media platforms, reducing customer feedback response time by 60% and identifying product issues faster.',
        'Architected an internal face recognition system with third-party API integration, improving recognition accuracy by 45% even under significant facial changes.',
        'Created detailed architecture diagrams, system specifications, and implementation plans to support solution delivery.',
        'Collaborated with third-party vendors and internal engineering teams to troubleshoot and resolve technical issues during development and post-deployment phases.',
        'Conducted manual testing on production-level web and mobile applications, and documented root cause analyses to accelerate defect resolution cycles.'
      ],
      achievements: [
        'Reduced customer feedback response time by 60% with NLP solution.',
        'Improved face recognition accuracy by 45% through API integration.',
        'Accelerated defect resolution cycles with thorough testing and documentation.'
      ]
    },
    {
      title: 'Application Developer Intern',
      company: 'PT Mayora Indah TBK',
      location: 'Jakarta, Indonesia',
      period: 'Feb 2022 – Feb 2023',
      description: [
        'Developed 7 web-based applications for the Finance and Tax division using Java Spring Boot, Vanilla JavaScript, Oracle SQL, HTML, and CSS to streamline daily operational workflows.',
        'Designed and built a mobile-based Help Desk application using Flutter, Node.js, and PostgreSQL as part of a thesis project, enhancing internal support efficiency.',
        'Collaborated with cross-functional teams to gather and analyze requirements, ensuring seamless system integration.',
        'Troubleshot and debugged existing applications, improving performance by 50–70% and optimizing data processing through indexing (B-tree) and query tuning.',
        'Increased backend responsiveness and data efficiency across financial systems through database optimization strategies.'
      ],
      achievements: [
        'Streamlined daily workflows for Finance and Tax division with 7 new apps.',
        'Enhanced internal support efficiency with mobile Help Desk app.',
        'Improved application performance by up to 70% through optimization.'
      ]
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Computer Science',
      school: 'Universitas Bina Nusantara',
      period: '2019 - 2023',
      gpa: 'GPA: 3.44/4.0'
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
