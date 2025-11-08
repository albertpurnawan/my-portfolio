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

export const useAboutStore = create<AboutState>()(
  persist(
    (set) => ({
      skills: [
        { title: 'Frontend Development', description: 'React, Vue.js, Next.js TypeScript, Tailwind CSS', projects: '20+ Projects' },
        { title: 'Backend Development', description: 'Node.js, Express, Python, PHP, PostgreSQL, MongoDB', projects: '20+ Projects' },
        { title: 'Full Stack Solutions', description: 'End-to-end web application development', projects: '20+ Projects' },
        { title: 'Mobile Development', description: 'React Native, Flutter', projects: '5+ Projects' },
      ],
      stats: [
        { number: '10+', label: 'Projects Completed' },
        { number: '3+', label: 'Years Experience' },
        { number: '4+', label: 'Happy Clients' },
        { number: '10+', label: 'Technologies' },
      ],
      education: [
        { degree: 'Bachelor of Computer Science', school: 'Bina Nusantara University', period: 'Sep 2019 – Apr 2023', gpa: 'GPA: 3.44 / 4.00 — Graduated in 3.5 years; KMK activist; Internship at PT Mayora Indah Tbk' },
        { degree: 'Full-Stack Web Development Bootcamp', school: 'Binar Academy', period: 'Mar 2021 – Oct 2021', gpa: 'Rated “Very Good” (4.6/5) in Hard Skills' },
      ],
      updateSkills: (skills) => set({ skills }),
      updateStats: (stats) => set({ stats }),
      updateEducation: (education) => set({ education }),
    }),
    { name: 'about-store' }
  )
);
