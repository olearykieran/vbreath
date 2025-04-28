export interface Level {
  id: number;
  name: string;
  meshType: 'sphere' | 'torus' | 'icosahedron' | 'octahedron' | 'dodecahedron';
  inhaleDur: number;
  exhaleDur: number;
  rounds?: {
    breathCount: number;
    holdDuration: number;
  }[];
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
  };
  audio: {
    musicURL: string;
    inhaleSFX: string;
    exhaleSFX: string;
  };
  premium: boolean;
}

export interface UserProgress {
  userId: string;
  levelId: number;
  timeSpent: number;
  completedSessions: number;
  lastSessionDate: string;
}

export interface User {
  id: string;
  email: string;
  tier: 'free' | 'pro';
  createdAt: string;
}

export interface BreathState {
  levels: Level[];
  currentLevelId: number;
  tempo: number;
  isPlaying: boolean;
  isInhaling: boolean;
  isPremiumUnlocked: boolean;
  
  currentLevel: () => Level | undefined;
  initializeLevels: () => void;
  setCurrentLevelId: (id: number) => void;
  setTempo: (tempo: number) => void;
  togglePlayPause: () => void;
  setIsInhaling: (isInhaling: boolean) => void;
  unlockPremium: () => void;
}

export interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export interface AudioControllerState {
  musicVolume: number;
  sfxVolume: number;
  isMusicMuted: boolean;
  isSfxMuted: boolean;
  
  setMusicVolume: (volume: number) => void;
  setSfxVolume: (volume: number) => void;
  toggleMusicMute: () => void;
  toggleSfxMute: () => void;
}