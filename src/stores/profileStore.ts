
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

export const useProfileStore = create<ProfileStore>()((set) => ({
  profile: {
    name: '', location: '', description: '', email: '', github: '', linkedin: '', profileImage: ''
  },
  updateProfile: (profile) => set({ profile }),
}));
