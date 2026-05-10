import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Music, Heart } from 'lucide-react';
import './MusicPlayer.css';

export default function MusicPlayer({ isPlaying, togglePlay, currentSong = "Maa - Taare Zameen Par" }) {
  return (
    <motion.div 
      className="spotify-player glass-panel"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      <div className="player-content">
        <div className="album-art">
          <Heart 
            size={20} 
            fill={isPlaying ? "var(--primary)" : "transparent"} 
            color="var(--primary)"
            className={isPlaying ? "beating-heart" : ""}
          />
        </div>
        
        <div className="song-info">
          <div className="scrolling-text">
            <span>{currentSong}</span>
          </div>
          <span className="artist-name">Shankar Mahadevan</span>
        </div>

        <button className="player-toggle" onClick={togglePlay}>
          {isPlaying ? (
            <Pause size={24} fill="currentColor" />
          ) : (
            <Play size={24} fill="currentColor" />
          )}
        </button>
      </div>
      
      {isPlaying && (
        <div className="player-visualizer">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      )}
    </motion.div>
  );
}
