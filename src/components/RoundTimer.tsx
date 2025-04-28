import { useEffect, useState } from 'react';
import { useBreathStore } from '../store/breathStore';

const RoundTimer: React.FC = () => {
  const { currentLevel, isPlaying } = useBreathStore();
  const [currentRound, setCurrentRound] = useState(0);
  const [breathCount, setBreathCount] = useState(0);
  const [holdTime, setHoldTime] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  
  const level = currentLevel();
  const rounds = level?.rounds || [];
  
  useEffect(() => {
    if (!isPlaying || !level?.rounds) return;
    
    let timer: NodeJS.Timeout;
    
    if (isHolding) {
      // Countdown for breath hold
      if (holdTime > 0) {
        timer = setInterval(() => {
          setHoldTime(time => time - 1);
        }, 1000);
      } else {
        // Move to next round or finish
        if (currentRound < rounds.length - 1) {
          setCurrentRound(round => round + 1);
          setBreathCount(0);
          setIsHolding(false);
        } else {
          // Finished all rounds
          setCurrentRound(0);
          setBreathCount(0);
          setIsHolding(false);
        }
      }
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, isHolding, holdTime, currentRound, rounds.length, level]);
  
  useEffect(() => {
    if (!isPlaying || !level?.rounds) return;
    
    if (!isHolding && breathCount >= rounds[currentRound].breathCount) {
      setIsHolding(true);
      setHoldTime(rounds[currentRound].holdDuration);
    }
  }, [breathCount, currentRound, isHolding, isPlaying, level, rounds]);
  
  useEffect(() => {
    if (!isPlaying) {
      setCurrentRound(0);
      setBreathCount(0);
      setIsHolding(false);
    }
  }, [isPlaying]);
  
  // Update breath count on each breath cycle
  useEffect(() => {
    if (!isPlaying || isHolding || !level?.rounds) return;
    setBreathCount(count => count + 1);
  }, [level?.rounds, isPlaying, isHolding]);
  
  if (!level?.rounds) return null;
  
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 text-center">
      <div className="text-lg font-medium mb-2">
        Round {currentRound + 1} of {rounds.length}
      </div>
      {isHolding ? (
        <div className="text-2xl font-bold text-sky-400">
          Hold: {holdTime}s
        </div>
      ) : (
        <div className="text-xl">
          Breaths: {breathCount} / {rounds[currentRound].breathCount}
        </div>
      )}
    </div>
  );
};

export default RoundTimer;