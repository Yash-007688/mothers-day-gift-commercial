import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Settings, RefreshCcw } from 'lucide-react';
import FloatingHearts from './components/FloatingHearts';
import EnvelopeCard from './components/EnvelopeCard';
import GreetingMessage from './components/GreetingMessage';
import MemoryGallery from './components/MemoryGallery';
import ReasonsSection from './components/ReasonsSection';
import RateTheLove from './components/RateTheLove';
import AdminPanel from './components/AdminPanel';
import MusicPlayer from './components/MusicPlayer';
import { getSettings, applyTheme } from './utils/settings';
import './App.css';

function App() {
  const [stage, setStage] = useState('envelope');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const audioRef = useRef(null);
  const settings = getSettings();

  useEffect(() => {
    applyTheme();
    
    // Auto-Play Logic
    if (settings.isAutoPlay && stage === 'envelope') {
      const timer = setTimeout(() => {
        handleOpenEnvelope();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleOpenEnvelope = () => {
    setStage('greeting');
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Autoplay prevented:", e));
      setIsPlaying(true);
    }
  };

  const restartExperience = () => {
    window.location.reload();
  };

  return (
    <div className="app-container">
      <FloatingHearts count={stage === 'greeting' ? 25 : 10} />
      
      {/* Background Music */}
      <audio 
        ref={audioRef}
        src={settings.songUrl}
        loop
      />

      {/* Spotify-Style Player */}
      <MusicPlayer 
        isPlaying={isPlaying} 
        togglePlay={toggleMusic} 
        currentSong={settings.songName || "Mother's Day Special"}
      />

      {/* Controls */}
      <div className="top-controls">
        <motion.button
          className="control-btn glass-panel"
          onClick={restartExperience}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          title="Restart"
        >
          <RefreshCcw size={20} />
        </motion.button>

        <motion.button
          className="control-btn glass-panel"
          onClick={() => setShowAdmin(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Settings size={24} />
        </motion.button>
      </div>

      <AnimatePresence>
        {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
      </AnimatePresence>
      
      <main className="content-container">
        {settings.isAutoPlay && (
          <div className="auto-play-indicator">
            <div className="pulse-dot"></div>
            <span>Auto-Play Mode</span>
          </div>
        )}

        <AnimatePresence mode="wait">
          {stage === 'envelope' && (
            <motion.div key="envelope" exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}>
              <EnvelopeCard onOpen={handleOpenEnvelope} />
            </motion.div>
          )}

          {stage === 'greeting' && (
            <motion.div key="greeting" exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }}>
              <GreetingMessage onNext={() => setStage('gallery')} isAutoPlay={settings.isAutoPlay} />
            </motion.div>
          )}

          {stage === 'gallery' && (
            <motion.div key="gallery" exit={{ opacity: 0, x: -50, transition: { duration: 0.5 } }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <MemoryGallery onNext={() => setStage('reasons')} isAutoPlay={settings.isAutoPlay} />
            </motion.div>
          )}

          {stage === 'reasons' && (
            <motion.div key="reasons" exit={{ opacity: 0, x: -50, transition: { duration: 0.5 } }} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <ReasonsSection onNext={() => setStage('rating')} isAutoPlay={settings.isAutoPlay} />
            </motion.div>
          )}

          {stage === 'rating' && (
            <motion.div key="rating" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
              <RateTheLove isAutoPlay={settings.isAutoPlay} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
