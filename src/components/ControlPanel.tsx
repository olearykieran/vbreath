import { useState } from "react";
import {
  Play,
  Pause,
  Moon,
  Sun,
  Volume2,
  Volume1,
  VolumeX,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  CreditCard,
} from "lucide-react";
import { useBreathStore } from "../store/breathStore";
import { useThemeStore } from "../store/themeStore";
import { useAudioStore } from "../store/audioStore";
import LevelSelector from "./LevelSelector";
import SecondsControl from "./SecondsControl";
import SubscriptionModal from "./SubscriptionModal";

const ControlPanel: React.FC = () => {
  const { isPlaying, togglePlayPause, isPremiumUnlocked } = useBreathStore();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { isMusicMuted, isSfxMuted, toggleMusicMute, toggleSfxMute } = useAudioStore();

  const [isExpanded, setIsExpanded] = useState(true);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  return (
    <>
      <div
        className={`absolute bottom-0 left-0 right-0 z-10 transition-all duration-300 ease-in-out ${
          isExpanded ? "translate-y-0" : "translate-y-[calc(100%-3.5rem)]"
        }`}
      >
        {/* Toggle control panel button */}
        <div className="flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-white/80 dark:bg-black/80 backdrop-blur-sm px-5 py-2 rounded-t-xl shadow-lg flex items-center gap-2"
          >
            {isExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
            <span className="text-sm font-medium">
              {isExpanded ? "Hide Controls" : "Show Controls"}
            </span>
          </button>
        </div>

        {/* Main control panel */}
        <div className="bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-lg p-6 rounded-t-xl flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">VibeBreath</h2>

            <div className="flex gap-3">
              {/* Audio controls */}
              <button
                onClick={toggleMusicMute}
                className="btn-secondary p-2 rounded-full"
                title="Toggle music"
              >
                {isMusicMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>

              <button
                onClick={toggleSfxMute}
                className="btn-secondary p-2 rounded-full"
                title="Toggle sound effects"
              >
                {isSfxMuted ? <VolumeX size={20} /> : <Volume1 size={20} />}
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="btn-secondary p-2 rounded-full"
                title="Toggle theme"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Level selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Breathing Pattern</label>
              <LevelSelector />
            </div>

            {/* Tempo control */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Breath Timing (seconds)</label>
              <SecondsControl />
            </div>

            {/* Play/pause controls */}
            <div className="flex items-end">
              <button
                onClick={togglePlayPause}
                className="btn btn-primary flex items-center justify-center gap-2 w-full"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                <span>{isPlaying ? "Pause" : "Start Breathing"}</span>
              </button>
            </div>
          </div>

          {/* Upgrade button (for free users) */}
          {!isPremiumUnlocked && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setShowSubscriptionModal(true)}
                className="btn bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white flex items-center gap-2"
              >
                <CreditCard size={18} />
                <span>Upgrade to Pro</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Subscription modal */}
      {showSubscriptionModal && (
        <SubscriptionModal onClose={() => setShowSubscriptionModal(false)} />
      )}
    </>
  );
};

export default ControlPanel;
