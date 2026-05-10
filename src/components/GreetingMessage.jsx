import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getSettings } from '../utils/settings';
import './GreetingMessage.css';

export default function GreetingMessage({ onNext, isAutoPlay }) {
  const { greetingTitle, greetingMessage } = getSettings();

  useEffect(() => {
    if (isAutoPlay) {
      const timer = setTimeout(() => {
        onNext();
      }, 8000); // Wait 8 seconds before moving to gallery
      return () => clearTimeout(timer);
    }
  }, [isAutoPlay, onNext]);

  return (
    <motion.div 
      className="greeting-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <div className="greeting-card glass-panel">
        <motion.h1 
          className="premium-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {greetingTitle}
        </motion.h1>
        
        <motion.div 
          className="greeting-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.5 }}
        >
          <p>{greetingMessage}</p>
          <p className="love-signoff">With all my love,</p>
        </motion.div>

        <motion.button 
          className="next-button glass-panel"
          onClick={onNext}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 1 }}
          whileHover={{ scale: 1.05, backgroundColor: 'var(--primary-glow)' }}
          whileTap={{ scale: 0.95 }}
        >
          <span>See Our Memories</span>
          <ArrowRight size={18} />
        </motion.button>
      </div>
    </motion.div>
  );
}
