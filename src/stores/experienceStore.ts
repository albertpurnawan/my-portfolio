
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Experience {
  id: number;
  position: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  achievements?: string[];
}

interface ExperienceStore {
  experiences: Experience[];
  addExperience: (experience: Experience) => void;
  updateExperience: (id: number, experience: Experience) => void;
  deleteExperience: (id: number) => void;
  updateExperiences: (experiences: Experience[]) => void;
}

export const useExperienceStore = create<ExperienceStore>()(
  persist(
    (set) => ({
      experiences: [
        {
          id: 1,
          position: 'Mobile Developer',
          company: 'PT Bank CIMB Niaga Tbk',
          location: 'Tangerang, Indonesia',
          period: 'Feb 2025 – Present',
          description: [
            'Collaborated with a cross-functional team of 12 members improving the Arjuna HRMS Mobile App used by 10,000+ employees and 200+ daily active users.',
            'Led refactor and modernization of legacy code into Flutter Clean Architecture.',
            'Designed and implemented Unit, Widget, and Integration Tests, achieving ~75% coverage.',
            'Built automated Jenkins pipelines for mobile deployment, cutting manual release effort by ~70%.',
            'Designed new system architecture blueprints for mobile-backend synchronization.'
          ],
          achievements: [
            '45% fewer recurring bugs via Clean Architecture refactor',
            '~75% test coverage and ~60% fewer regressions',
            '~70% reduction in manual release effort with Jenkins',
            '~30% improvement in request handling efficiency'
          ]
        },
        {
          id: 2,
          position: 'Senior Full-Stack Developer',
          company: 'PT BeOne Optima Solusi',
          location: 'Tangerang, Indonesia',
          period: 'Nov 2024 – Feb 2025',
          description: [
            'Led a 6-person cross-functional team delivering ERP and POS systems for 100+ users handling 500+ daily transactions.',
            'Delivered BeOne BI (Laravel + React Native + PostgreSQL), cutting report generation time by ~50% via optimized SQL and async pipelines.',
            'Built POS systems (Flutter, Bloc, SQLite) with offline-first functionality, improving task completion rate by ~35%.',
            'Refactored monolithic backends into microservices (Go + TypeScript), improving modular scalability.',
            'Migrated infrastructure to Alibaba Cloud and set up CI/CD (Jenkins + Docker) with automated testing.',
            'Mentored junior developers and led code reviews to improve productivity and code quality.'
          ],
          achievements: [
            '~50% faster reporting in BeOne BI',
            '~35% improvement in POS task completion',
            '~80% increase in deployment frequency with CI/CD',
            '~99.9% uptime post-cloud migration'
          ]
        },
        {
          id: 3,
          position: 'Software Developer (Backend Focus)',
          company: 'PT Agile Technica',
          location: 'Tangerang, Indonesia',
          period: 'Nov 2023 – Nov 2024',
          description: [
            'Collaborated with a core team maintaining ERP systems for 100+ users and 1,000+ daily transactions.',
            'Enhanced ERP modules (HR, Helpdesk, LMS, Accounting) on Python Frappe through indexing, cron jobs, and queue refactor.',
            'Automated deployments using Docker and Kubernetes on AWS.',
            'Implemented task schedulers and scaling logic to reduce data sync delays during peak usage.',
            'Set up backend observability dashboards with alerting and monitoring.'
          ],
          achievements: [
            '~45% query efficiency improvements across ERP modules',
            '~80% deployment success rate with Docker/Kubernetes',
            'Data sync delay reduced from ~30s to ~10s',
            '~60% faster incident response via observability'
          ]
        },
        {
          id: 4,
          position: 'Technical Solution Architect',
          company: 'PT Mastersystem Infotama',
          location: 'Jakarta, Indonesia',
          period: 'Jun 2023 – Sep 2023',
          description: [
            'Designed enterprise solutions for financial clients with a team of Cloud Engineers and PMs.',
            'Architected facial-recognition attendance using AWS Rekognition and third-party OCR APIs.',
            'Built NLP-based social media sentiment analysis via AWS Comprehend for 10,000+ daily mentions.',
            'Delivered technical documentation, deployment diagrams, and validation reports for handover.',
            'Integrated cloud services into client systems, improving detection accuracy and API stability.'
          ],
          achievements: [
            '~50% faster authentication with face recognition system',
            '~60% reduction in manual review time with NLP',
            'Improved detection accuracy and API stability'
          ]
        },
        {
          id: 5,
          position: 'Application Developer Intern',
          company: 'PT Mayora Indah Tbk',
          location: 'Jakarta, Indonesia',
          period: 'Feb 2022 – Feb 2023',
          description: [
            'Supported the Finance division (100+ users, up to 1,000 daily transactions) as a Full-Stack Developer.',
            'Developed and maintained 7+ internal finance and tax apps using Java Spring Boot, JavaScript, Flutter, and MariaDB, integrated with SAP.',
            'Enhanced backend logic and optimized database performance through B-Tree indexing and query refactoring (~70% faster responses).',
            'Refactored the frontend architecture and state management with lazy loading and skeleton UI (~35% faster initial render).',
            'Collaborated with stakeholders to test and deploy production releases.'
          ],
          achievements: [
            'Built and maintained 7+ internal apps',
            '~70% faster backend responses via optimization',
            '~35% faster initial render with frontend refactor'
          ]
        }
      ],
      addExperience: (experience) => set((state) => ({
        experiences: [...state.experiences, experience]
      })),
      updateExperience: (id, updatedExperience) => set((state) => ({
        experiences: state.experiences.map(experience =>
          experience.id === id ? updatedExperience : experience
        )
      })),
      deleteExperience: (id) => set((state) => ({
        experiences: state.experiences.filter(experience => experience.id !== id)
      })),
      updateExperiences: (experiences) => set(() => ({ experiences })),
    }),
    {
      name: 'experience-store',
    }
  )
);
