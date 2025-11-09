import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Skill { title: string; description: string; projects?: string; icon?: string }
interface Stat { number: string; label: string }
interface Education { degree: string; school: string; period: string; gpa?: string }

interface AboutState {
  skills: Skill[];
  stats: Stat[];
  education: Education[];
  updateSkills: (skills: Skill[]) => void;
  updateStats: (stats: Stat[]) => void;
  updateEducation: (education: Education[]) => void;
}

export const useAboutStore = create<AboutState>()((set) => ({
  skills: [],
  stats: [],
  education: [],
  updateSkills: (skills) => set({ skills }),
  updateStats: (stats) => set({ stats }),
  updateEducation: (education) => set({ education }),
}));
