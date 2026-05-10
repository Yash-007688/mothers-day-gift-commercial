import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getSettings } from '../utils/settings';
import './EnvelopeCard.css';

export default function EnvelopeCard({ onOpen }) {
  const { envelopeText, envelopeHint } = getSettings();

  const handleOpen = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff6b81', '#ffa07a', '#ffffff', '#ffb6c1']
    });
    
    onOpen();
  };

  return (
    <motion.div 
      className="envelope-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div 
        className="envelope glass-panel"
        whileHover={{ scale: 1.05, y: -10 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpen}
      >
        <div className="envelope-glow"></div>
        <Mail size={48} className="envelope-icon" color="var(--primary)" />
        <h2 className="premium-text">{envelopeText}</h2>
        <p>{envelopeHint}</p>
      </motion.div>
    </motion.div>
  );
}
