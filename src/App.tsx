import React, { useEffect } from 'react';
import BreathScene from './components/BreathScene';
import ControlPanel from './components/ControlPanel';
import { useBreathStore } from './store/breathStore';
import { useThemeStore } from './store/themeStore';

function App() {
  const { isDarkMode } = useThemeStore();
  const { initializeLevels } = useBreathStore();
  
  useEffect(() => {
    initializeLevels();
  }, [initializeLevels]);

  return (
    <div className={`${isDarkMode ? 'dark' : ''} transition-colors duration-300`}>
      <div className="relative w-screen h-screen overflow-hidden bg-slate-950">
        <BreathScene />
        <ControlPanel />
      </div>
    </div>
  );
}

export default App;