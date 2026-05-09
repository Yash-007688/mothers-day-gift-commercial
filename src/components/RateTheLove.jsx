import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import './RateTheLove.css';

export default function RateTheLove() {
  const [rated, setRated] = useState(false);

  const handleRating = (rating) => {
    setRated(true);
    // Huge confetti blast
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff6b81', '#ffa07a']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff6b81', '#ffa07a']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <motion.div 
      className="rate-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="rate-card glass-panel">
        {!rated ? (
          <>
            <h2 className="premium-text">Rate My Love For You</h2>
            <p className="rate-subtitle">On a scale of 1 to 5, how much do you think I love you?</p>
            
            <div className="stars-container">
              {[1, 2, 3, 4, 5].map((num) => (
                <motion.button
                  key={num}
                  className="star-button"
                  onClick={() => handleRating(num)}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Star size={48} color="var(--primary)" />
                  <span className="star-number">{num}</span>
                </motion.button>
              ))}
            </div>
          </>
        ) : (
          <motion.div 
            className="infinity-love"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <Heart size={80} color="var(--primary)" fill="var(--primary)" className="beating-heart" />
            <h2 className="premium-text">Trick Question!</h2>
            <p className="infinity-text">My love for you is INFINITE! ♾️❤️</p>
            <p className="final-message">Happy Mother's Day, Mom!</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
