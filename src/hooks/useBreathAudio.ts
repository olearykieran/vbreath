import { useEffect, useRef } from 'react';
import { useBreathStore } from '../store/breathStore';
import { useAudioStore } from '../store/audioStore';

export const useBreathAudio = () => {
  const { currentLevel, isPlaying, isInhaling } = useBreathStore();
  const { musicVolume, sfxVolume, isMusicMuted, isSfxMuted } = useAudioStore();
  
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const inhaleSfxRef = useRef<HTMLAudioElement | null>(null);
  const exhaleSfxRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio elements
  useEffect(() => {
    if (!musicRef.current) {
      musicRef.current = new Audio();
      musicRef.current.loop = true;
    }
    
    if (!inhaleSfxRef.current) {
      inhaleSfxRef.current = new Audio();
    }
    
    if (!exhaleSfxRef.current) {
      exhaleSfxRef.current = new Audio();
    }
    
    return () => {
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current.src = '';
      }
      
      if (inhaleSfxRef.current) {
        inhaleSfxRef.current.pause();
        inhaleSfxRef.current.src = '';
      }
      
      if (exhaleSfxRef.current) {
        exhaleSfxRef.current.pause();
        exhaleSfxRef.current.src = '';
      }
    };
  }, []);
  
  // Update audio sources when level changes
  useEffect(() => {
    const level = currentLevel();
    if (!level) return;
    
    const loadAudio = async (audioRef: HTMLAudioElement | null, src: string) => {
      if (!audioRef) return;
      
      try {
        audioRef.src = src;
        // Preload the audio
        await audioRef.load();
      } catch (err) {
        console.error(`Error loading audio from ${src}:`, err);
      }
    };

    // Load all audio sources
    loadAudio(musicRef.current, level.audio.musicURL);
    loadAudio(inhaleSfxRef.current, level.audio.inhaleSFX);
    loadAudio(exhaleSfxRef.current, level.audio.exhaleSFX);
  }, [currentLevel]);
  
  // Handle play/pause
  useEffect(() => {
    if (isPlaying) {
      if (musicRef.current && !isMusicMuted) {
        musicRef.current.play().catch(err => console.error('Error playing music:', err));
      }
    } else {
      if (musicRef.current) {
        // Fade out
        const fadeOut = setInterval(() => {
          if (musicRef.current && musicRef.current.volume > 0.02) {
            musicRef.current.volume -= 0.02;
          } else {
            if (musicRef.current) {
              musicRef.current.pause();
              musicRef.current.volume = musicVolume;
            }
            clearInterval(fadeOut);
          }
        }, 50);
      }
    }
  }, [isPlaying, isMusicMuted, musicVolume]);
  
  // Handle volume changes
  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = isMusicMuted ? 0 : musicVolume;
    }
  }, [musicVolume, isMusicMuted]);
  
  useEffect(() => {
    if (inhaleSfxRef.current) {
      inhaleSfxRef.current.volume = isSfxMuted ? 0 : sfxVolume;
    }
    
    if (exhaleSfxRef.current) {
      exhaleSfxRef.current.volume = isSfxMuted ? 0 : sfxVolume;
    }
  }, [sfxVolume, isSfxMuted]);
  
  // Play breath sound effects
  useEffect(() => {
    if (!isPlaying || isSfxMuted) return;
    
    const playAudio = async (audioRef: HTMLAudioElement | null) => {
      if (!audioRef) return;
      
      try {
        audioRef.currentTime = 0;
        await audioRef.play();
      } catch (err) {
        console.error('Error playing audio:', err);
      }
    };

    if (isInhaling) {
      playAudio(inhaleSfxRef.current);
    } else {
      playAudio(exhaleSfxRef.current);
    }
  }, [isInhaling, isPlaying, isSfxMuted]);
  
  return {
    toggleMusicMute: () => {
      if (musicRef.current) {
        if (isMusicMuted) {
          musicRef.current.volume = musicVolume;
        } else {
          musicRef.current.volume = 0;
        }
      }
    }
  };
};