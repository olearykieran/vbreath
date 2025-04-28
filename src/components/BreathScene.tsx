import { useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import { useBreathStore } from '../store/breathStore';
import MeshObject from './MeshObject';
import ShootingStars from './ShootingStars';
import RoundTimer from './RoundTimer';

const BreathScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isPlaying, currentLevel } = useBreathStore();
  
  const level = useMemo(() => currentLevel(), [currentLevel]);
  
  return (
    <div className="absolute inset-0 z-0">
      {level?.rounds && <RoundTimer />}
      <Canvas
        ref={canvasRef}
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ 
          antialias: true,
          alpha: true 
        }}
        style={{ background: 'radial-gradient(circle at 50% 50%, #0a192f 0%, #020617 100%)' }}
      >
        {/* Dynamic stars background */}
        <Stars 
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        
        {/* Ambient lighting for the scene */}
        <ambientLight intensity={0.3} />
        
        {/* Moonlight effect */}
        <directionalLight 
          position={[5, 8, 5]} 
          intensity={0.8}
          color="#94a3b8"
        />
        
        {/* Subtle rim light */}
        <pointLight
          position={[-5, -5, -5]}
          intensity={0.2}
          color="#38bdf8"
        />
        
        {/* Add atmospheric fog */}
        <fog attach="fog" args={['#0a192f', 8, 30]} />
        
        <ShootingStars isPlaying={isPlaying} />
        <MeshObject />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          rotateSpeed={0.5}
          enabled={isPlaying}
          autoRotate={!isPlaying}
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
};

export default BreathScene;