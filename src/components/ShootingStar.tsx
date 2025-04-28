import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ShootingStarProps {
  onComplete: () => void;
}

const ShootingStar: React.FC<ShootingStarProps> = ({ onComplete }) => {
  const ref = useRef<THREE.Points>(null);
  const startPosition = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const speed = useRef(0);
  
  useEffect(() => {
    if (!ref.current) return;
    
    // Random starting position in the upper hemisphere
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI * 0.5;
    const radius = 50;
    
    startPosition.current.setFromSphericalCoords(radius, phi, theta);
    ref.current.position.copy(startPosition.current);
    
    // Random direction downward
    direction.current.set(
      -0.5 + Math.random(),
      -1,
      -0.5 + Math.random()
    ).normalize();
    
    // Random speed
    speed.current = 0.5 + Math.random() * 0.5;
  }, []);
  
  useFrame(() => {
    if (!ref.current) return;
    
    ref.current.position.addScaledVector(direction.current, speed.current);
    
    // Remove when out of view
    if (ref.current.position.y < -30) {
      onComplete();
    }
  });
  
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={6}
          array={new Float32Array([0, 0, 0, 0, 0, 0])}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.5}
        color="#fff"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

export default ShootingStar