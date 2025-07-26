
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
        name: 'Jonathan Albert Purnawan',
        location: 'Tangerang, Indonesia',
        description: 'Software Engineer passionate about creating innovative web solutions. Experienced in full-stack development with expertise in modern frameworks and technologies.',
        email: 'albertpurnawan1@gmail.com',
        github: 'https://github.com/albertpurnawan?tab=repositories',
        linkedin: 'https://www.linkedin.com/in/albertpurnawan/',
        profileImage: 'images/profile.png'
      },
      updateProfile: (profile) => set({ profile }),
    }),
    {
      name: 'profile-store',
    }
  )
);
