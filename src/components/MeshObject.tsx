import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { mergeBufferGeometries } from 'three-stdlib';
import { useBreathStore } from '../store/breathStore';
import { useBreathAnimation } from '../hooks/useBreathAnimation';
import { useBreathAudio } from '../hooks/useBreathAudio';

const MeshObject: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { currentLevel, isInhaling } = useBreathStore();
  
  // Initialize breath animation and audio
  useBreathAnimation(meshRef);
  useBreathAudio();
  
  // Get current level
  const level = currentLevel();
  
  // Create mesh based on the current level
  const geometry = useMemo(() => {
    if (!level) return new THREE.SphereGeometry(1, 32, 32);
    
    // Create heart shape for the Loving Heart pattern
    if (level.name === "Loving Heart") {
      const heartShape = new THREE.Shape();
      const x = 0, y = 0;
      
      heartShape.moveTo(x, y);
      heartShape.bezierCurveTo(x + 1, y + 1, x + 1.5, y + 2, x, y + 3);
      heartShape.bezierCurveTo(x - 1.5, y + 2, x - 1, y + 1, x, y);
      
      return new THREE.ExtrudeGeometry(heartShape, {
        depth: 0.5,
        bevelEnabled: true,
        bevelSegments: 8,
        bevelSize: 0.1,
        bevelThickness: 0.1
      });
    }
    
    // Create teddy bear shape for the Teddy Comfort pattern
    if (level.name === "Teddy Comfort") {
      const group = new THREE.Group();
      
      // Body (slightly elongated sphere)
      const body = new THREE.SphereGeometry(1, 32, 32);
      body.scale(1, 1.2, 0.8);
      
      // Head (smaller sphere)
      const head = new THREE.SphereGeometry(0.6, 32, 32);
      head.translate(0, 1.1, 0);
      
      // Ears (tiny spheres)
      const ear1 = new THREE.SphereGeometry(0.2, 16, 16);
      ear1.translate(-0.4, 1.5, 0);
      const ear2 = new THREE.SphereGeometry(0.2, 16, 16);
      ear2.translate(0.4, 1.5, 0);
      
      // Combine all geometries
      return mergeBufferGeometries([body, head, ear1, ear2]);
    }
    
    switch (level.meshType) {
      case 'sphere':
        return new THREE.SphereGeometry(1, 64, 64);
      case 'torus':
        return new THREE.TorusGeometry(1, 0.4, 32, 100);
      case 'icosahedron':
        return new THREE.IcosahedronGeometry(1, 2);
      case 'octahedron':
        return new THREE.OctahedronGeometry(1, 2);
      case 'dodecahedron':
        return new THREE.DodecahedronGeometry(1, 1);
      default:
        return new THREE.SphereGeometry(1, 32, 32);
    }
  }, [level]);
  
  // Create material with color transitions
  const material = useMemo(() => {
    if (!level) return new THREE.MeshStandardMaterial({ color: '#3B82F6' });
    
    const color = isInhaling 
      ? new THREE.Color(level.colorPalette.primary)
      : new THREE.Color(level.colorPalette.secondary);
    
    return new THREE.MeshStandardMaterial({
      color,
      roughness: 0.4,
      metalness: 0.3,
      emissive: new THREE.Color(level.colorPalette.accent).multiplyScalar(0.2),
    });
  }, [level, isInhaling]);
  
  // Update material color based on inhale/exhale state
  useMemo(() => {
    if (!level || !material) return;
    
    const targetColor = isInhaling 
      ? new THREE.Color(level.colorPalette.primary)
      : new THREE.Color(level.colorPalette.secondary);
    
    if (material instanceof THREE.MeshStandardMaterial) {
      material.color = targetColor;
    }
  }, [isInhaling, level, material]);
  
  if (!level) return null;
  
  return (
    <mesh ref={meshRef} geometry={geometry} material={material} />
  );
};

export default MeshObject;