import { Fragment } from 'react';
import { Lock } from 'lucide-react';
import { useBreathStore } from '../store/breathStore';

const LevelSelector: React.FC = () => {
  const { levels, currentLevelId, setCurrentLevelId, isPremiumUnlocked } = useBreathStore();
  
  return (
    <div className="relative">
      <select
        value={currentLevelId}
        onChange={(e) => setCurrentLevelId(Number(e.target.value))}
        className="w-full p-2 pr-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 appearance-none"
      >
        {levels.map((level) => (
          <option 
            key={level.id} 
            value={level.id}
            disabled={level.premium && !isPremiumUnlocked}
          >
            {level.name}{level.premium && !isPremiumUnlocked ? ' (Pro)' : ''}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        {levels.find(l => l.id === currentLevelId)?.premium && !isPremiumUnlocked ? (
          <Lock size={16} className="text-gray-400" />
        ) : (
          <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        )}
      </div>
    </div>
  );
};

export default LevelSelector;