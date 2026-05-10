import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { getSettings } from '../utils/settings';
import './ReasonsSection.css';

export default function ReasonsSection({ onNext, isAutoPlay }) {
  const { reasons, reasonsTitle } = getSettings();
  const [flippedIndices, setFlippedIndices] = useState([]);

  useEffect(() => {
    if (isAutoPlay) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < reasons.length) {
          setFlippedIndices(prev => [...prev, index]);
          index++;
        } else {
          clearInterval(interval);
          setTimeout(onNext, 4000); // Move to rating 4s after last flip
        }
      }, 3000); // Flip every 3 seconds
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, reasons.length, onNext]);

  return (
    <motion.div 
      className="reasons-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="reasons-header">
        <h2 className="premium-text">{reasonsTitle}</h2>
        <Star className="header-icon" fill="var(--primary)" color="var(--primary)" size={24} />
      </div>

      <div className="cards-grid">
        {reasons.map((reason, index) => (
          <FlipCard 
            key={index} 
            reason={reason} 
            index={index + 1} 
            forceFlip={flippedIndices.includes(index)} 
          />
        ))}
      </div>

      <motion.button 
        className="next-section-button glass-panel"
        onClick={onNext}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        style={{ marginTop: '48px', padding: '12px 32px', fontSize: '1.1rem', cursor: 'pointer' }}
        whileHover={{ scale: 1.05, backgroundColor: 'var(--primary-glow)', color: '#fff' }}
        whileTap={{ scale: 0.95 }}
      >
        Wait, I have one last question for you...
      </motion.button>
    </motion.div>
  );
}

function FlipCard({ reason, index, forceFlip }) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (forceFlip) setIsFlipped(true);
  }, [forceFlip]);

  return (
    <div 
      className="flip-card"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div 
        className="flip-card-inner"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="flip-card-front glass-panel">
          <h3 className="premium-text">Reason #{index}</h3>
          <p className="tap-hint">Tap to reveal</p>
        </div>
        <div className="flip-card-back glass-panel">
          <p>{reason}</p>
        </div>
      </motion.div>
    </div>
  );
}
