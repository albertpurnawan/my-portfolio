
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Profile {
  name: string;
  location: string;
  description: string;
  email: string;
  github: string;
  linkedin: string;
  profileImage: string;
}

interface ProfileStore {
  profile: Profile;
  updateProfile: (profile: Profile) => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: {
        name: 'Jonathan Robert Parlaungan',
        location: 'Jakarta, Indonesia',
        description: 'Software Engineer passionate about creating innovative web solutions. Experienced in full-stack development with expertise in modern frameworks and technologies.',
        email: 'jonathan@example.com',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
      },
      updateProfile: (profile) => set({ profile }),
    }),
    {
      name: 'profile-store',
    }
  )
);
