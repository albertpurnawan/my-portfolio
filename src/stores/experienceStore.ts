
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

export const useExperienceStore = create<ExperienceStore>()((set) => ({
  experiences: [],
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
}));
