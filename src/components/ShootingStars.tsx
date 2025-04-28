import { useState, useCallback, useEffect } from 'react';
import ShootingStar from './ShootingStar';

interface ShootingStarsProps {
  isPlaying: boolean;
}

const ShootingStars: React.FC<ShootingStarsProps> = ({ isPlaying }) => {
  const [stars, setStars] = useState<number[]>([]);
  
  const removeStar = useCallback((id: number) => {
    setStars(stars => stars.filter(starId => starId !== id));
  }, []);
  
  useEffect(() => {
    if (!isPlaying) {
      setStars([]);
      return;
    }
    
    const interval = setInterval(() => {
      // 5% chance every 2 seconds to spawn a shooting star
      if (Math.random() < 0.05) {
        setStars(stars => [...stars, Date.now()]);
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isPlaying]);
  
  return (
    <>
      {stars.map(id => (
        <ShootingStar key={id} onComplete={() => removeStar(id)} />
      ))}
    </>
  );
}

export default ShootingStars;