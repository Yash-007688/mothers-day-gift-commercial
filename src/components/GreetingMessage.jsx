import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './GreetingMessage.css';

export default function GreetingMessage({ onNext }) {
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
          Happy Mother's Day!
        </motion.h1>
        
        <motion.div 
          className="greeting-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.5 }}
        >
          <p>
            Thank you for your endless love, patience, and support. 
            You are the heart of our family and my biggest inspiration. 
            Today is all about celebrating you!
          </p>
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
