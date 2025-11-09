
import { create } from 'zustand';

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

export const useProjectStore = create<ProjectStore>()((set) => ({
  projects: [],
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
}));
