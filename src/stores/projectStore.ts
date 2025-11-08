
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  date: string;
  github: string;
  demo: string;
  showGithub?: boolean;
  showDemo?: boolean;
  embedUrl?: string;
}

interface ProjectStore {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (id: number, project: Project) => void;
  deleteProject: (id: number) => void;
  updateProjects: (projects: Project[]) => void;
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      projects: [
        // {
        //   id: 1,
        //   title: 'E-Commerce Platform',
        //   category: 'Full Stack',
        //   description: 'Modern e-commerce platform built with React, Node.js, and PostgreSQL. Features include user authentication, payment integration, and admin dashboard.',
        //   image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
        //   tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
        //   date: '2024',
        //   github: 'https://github.com/albertpurnawan?tab=repositories',
        //   demo: 'https://example.com'
        // },
        // {
        //   id: 2,
        //   title: 'Task Management App',
        //   category: 'Frontend',
        //   description: 'Responsive task management application with drag-and-drop functionality, real-time updates, and team collaboration features.',
        //   image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop',
        //   tech: ['Vue.js', 'Vuex', 'Socket.io', 'Tailwind'],
        //   date: '2024',
        //   github: 'https://github.com/albertpurnawan?tab=repositories',
        //   demo: 'https://example.com'
        // }
      ],
      addProject: (project) => set((state) => ({
        projects: [...state.projects, project]
      })),
      updateProject: (id, updatedProject) => set((state) => ({
        projects: state.projects.map(project =>
          project.id === id ? updatedProject : project
        )
      })),
      deleteProject: (id) => set((state) => ({
        projects: state.projects.filter(project => project.id !== id)
      })),
      updateProjects: (projects) => set(() => ({ projects })),
    }),
    {
      name: 'project-store',
    }
  )
);
