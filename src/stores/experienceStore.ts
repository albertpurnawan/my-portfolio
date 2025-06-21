
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Experience {
  id: number;
  position: string;
  company: string;
  period: string;
  description: string;
  achievements?: string[];
}

interface ExperienceStore {
  experiences: Experience[];
  addExperience: (experience: Experience) => void;
  updateExperience: (id: number, experience: Experience) => void;
  deleteExperience: (id: number) => void;
}

export const useExperienceStore = create<ExperienceStore>()(
  persist(
    (set) => ({
      experiences: [
        {
          id: 1,
          position: 'Senior Full Stack Developer',
          company: 'Tech Innovators Inc.',
          period: 'Jan 2022 - Present',
          description: 'Leading development of scalable web applications using modern technologies. Mentoring junior developers and architecting system solutions.',
          achievements: [
            'Increased application performance by 40%',
            'Led team of 5 developers',
            'Implemented CI/CD pipeline'
          ]
        },
        {
          id: 2,
          position: 'Frontend Developer',
          company: 'Digital Solutions Ltd.',
          period: 'Mar 2020 - Dec 2021',
          description: 'Developed responsive web applications and user interfaces. Collaborated with design team to implement pixel-perfect designs.',
          achievements: [
            'Built 15+ responsive websites',
            'Improved page load speeds by 30%',
            'Implemented modern frontend frameworks'
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
    }),
    {
      name: 'experience-store',
    }
  )
);
