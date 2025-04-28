import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AudioControllerState } from '../types';

export const useAudioStore = create<AudioControllerState>()(
  persist(
    (set) => ({
      musicVolume: 0.5,
      sfxVolume: 0.7,
      isMusicMuted: false,
      isSfxMuted: false,
      
      setMusicVolume: (volume: number) => set({ musicVolume: volume }),
      setSfxVolume: (volume: number) => set({ sfxVolume: volume }),
      toggleMusicMute: () => set(state => ({ isMusicMuted: !state.isMusicMuted })),
      toggleSfxMute: () => set(state => ({ isSfxMuted: !state.isSfxMuted })),
    }),
    {
      name: 'audio-settings',
    }
  )
);