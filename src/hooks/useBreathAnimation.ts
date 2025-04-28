import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useBreathStore } from "../store/breathStore";

export const useBreathAnimation = (meshRef: React.RefObject<THREE.Mesh>) => {
  const { isPlaying, inhaleSec, exhaleSec, setIsInhaling } = useBreathStore();
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  // Setup animation timeline
  useEffect(() => {
    if (!meshRef.current) return;

    // Clear any existing animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Create a timeline for the breathing animation
    const timeline = gsap.timeline({
      repeat: -1,
      paused: !isPlaying,
      onUpdate: () => {
        // Determine if currently in inhale or exhale phase
        const progress = timeline.progress();
        const totalDuration = inhaleSec + exhaleSec;
        const inhaleEndProgress = inhaleSec / totalDuration;

        setIsInhaling(progress < inhaleEndProgress);
      },
    });

    // Inhale animation (scale up)
    timeline.to(meshRef.current.scale, {
      x: 1.3,
      y: 1.3,
      z: 1.3,
      duration: inhaleSec,
      ease: "power2.inOut",
    });

    // Exhale animation (scale down)
    timeline.to(meshRef.current.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: exhaleSec,
      ease: "power2.inOut",
    });

    animationRef.current = timeline;
  }, [inhaleSec, exhaleSec, meshRef, isPlaying, setIsInhaling]);

  // Handle play/pause
  useEffect(() => {
    if (!animationRef.current) return;

    if (isPlaying) {
      animationRef.current.play();
    } else {
      animationRef.current.pause();
    }
  }, [isPlaying]);

  // Add subtle floating animation
  useFrame(({ clock }) => {
    if (!meshRef.current || !isPlaying) return;

    meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
  });

  return {
    restartAnimation: () => {
      if (animationRef.current) {
        animationRef.current.restart();
      }
    },
  };
};
