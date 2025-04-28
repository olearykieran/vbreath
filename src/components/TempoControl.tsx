import { Minus, Plus } from 'lucide-react';
import { useBreathStore } from '../store/breathStore';

const TempoControl: React.FC = () => {
  const { tempo, setTempo } = useBreathStore();
  
  const decreaseTempo = () => {
    setTempo(Math.max(0.5, tempo - 0.1));
  };
  
  const increaseTempo = () => {
    setTempo(Math.min(2.0, tempo + 0.1));
  };
  
  // Format tempo to display with one decimal place
  const displayTempo = tempo.toFixed(1);
  
  return (
    <div className="flex items-center">
      <button
        onClick={decreaseTempo}
        className="p-2 rounded-l-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 flex items-center justify-center"
        aria-label="Decrease tempo"
      >
        <Minus size={16} />
      </button>
      
      <div className="flex-1 px-4 py-2 text-center bg-gray-100 dark:bg-gray-800">
        <span className="font-medium">{displayTempo}×</span>
      </div>
      
      <button
        onClick={increaseTempo}
        className="p-2 rounded-r-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 flex items-center justify-center"
        aria-label="Increase tempo"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default TempoControl;