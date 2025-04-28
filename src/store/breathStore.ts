import { create } from 'zustand';
import { levels } from '../data/levels';
import type { BreathState } from '../types';

export const useBreathStore = create<BreathState>((set, get) => ({
  levels: [],
  currentLevelId: 0,
  tempo: 1.0,
  isPlaying: false,
  isInhaling: false,
  isPremiumUnlocked: false,
  
  currentLevel: () => {
    const { levels, currentLevelId } = get();
    return levels.find(level => level.id === currentLevelId);
  },
  
  initializeLevels: () => {
    set({ levels });
  },
  
  setCurrentLevelId: (id: number) => {
    const { isPremiumUnlocked } = get();
    const targetLevel = levels.find(level => level.id === id);
    
    // Don't allow setting premium levels if premium is not unlocked
    if (targetLevel && (targetLevel.premium === false || isPremiumUnlocked)) {
      set({ currentLevelId: id });
    }
  },
  
  setTempo: (tempo: number) => {
    set({ tempo: Math.max(0.5, Math.min(2.0, tempo)) });
  },
  
  togglePlayPause: () => {
    set(state => ({ isPlaying: !state.isPlaying }));
  },
  
  setIsInhaling: (isInhaling: boolean) => {
    set({ isInhaling });
  },
  
  unlockPremium: () => {
    set({ isPremiumUnlocked: true });
  }
}));