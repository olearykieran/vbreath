import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeState } from '../types';

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: true,
      toggleTheme: () => set(state => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'theme-storage',
    }
  )
);