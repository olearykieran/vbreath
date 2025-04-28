import { Minus, Plus } from "lucide-react";
import { useBreathStore } from "../store/breathStore";

const SecondsControl: React.FC = () => {
  const { inhaleSec, exhaleSec, setInhaleSec, setExhaleSec } = useBreathStore();
  const minSec = 1;
  const maxSec = 20;

  const handleInhaleChange = (delta: number) => {
    setInhaleSec(Math.max(minSec, Math.min(maxSec, inhaleSec + delta)));
  };

  const handleExhaleChange = (delta: number) => {
    setExhaleSec(Math.max(minSec, Math.min(maxSec, exhaleSec + delta)));
  };

  const totalCycle = inhaleSec + exhaleSec;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <span className="w-20">Inhale</span>
        <button
          onClick={() => handleInhaleChange(-1)}
          className="p-2 rounded-l-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 flex items-center justify-center"
          aria-label="Decrease inhale seconds"
        >
          <Minus size={16} />
        </button>
        <div className="flex-1 px-4 py-2 text-center bg-gray-100 dark:bg-gray-800">
          <span className="font-medium">{inhaleSec} s</span>
        </div>
        <button
          onClick={() => handleInhaleChange(1)}
          className="p-2 rounded-r-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 flex items-center justify-center"
          aria-label="Increase inhale seconds"
        >
          <Plus size={16} />
        </button>
      </div>
      <div className="flex items-center">
        <span className="w-20">Exhale</span>
        <button
          onClick={() => handleExhaleChange(-1)}
          className="p-2 rounded-l-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 flex items-center justify-center"
          aria-label="Decrease exhale seconds"
        >
          <Minus size={16} />
        </button>
        <div className="flex-1 px-4 py-2 text-center bg-gray-100 dark:bg-gray-800">
          <span className="font-medium">{exhaleSec} s</span>
        </div>
        <button
          onClick={() => handleExhaleChange(1)}
          className="p-2 rounded-r-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 flex items-center justify-center"
          aria-label="Increase exhale seconds"
        >
          <Plus size={16} />
        </button>
      </div>
      <div className="text-center mt-2 text-sm text-gray-600 dark:text-gray-300">
        Total cycle: <span className="font-semibold">{totalCycle} s</span>
      </div>
    </div>
  );
};

export default SecondsControl;
