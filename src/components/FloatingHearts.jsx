import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FloatingHearts({ count = 15 }) {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const newHearts = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 20,
      size: 16 + Math.random() * 24,
    }));
    setHearts(newHearts);
  }, [count]);

  return (
    <div className="hearts-container" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '110vh', x: `${heart.x}vw`, opacity: 0, scale: 0 }}
          animate={{
            y: '-10vh',
            x: `${heart.x + (Math.random() * 10 - 5)}vw`,
            opacity: [0, 0.7, 0.7, 0],
            scale: [0, 1, 1, 0.8],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ position: 'absolute' }}
        >
          <Heart size={heart.size} color="var(--primary)" fill="var(--primary-glow)" />
        </motion.div>
      ))}
    </div>
  );
}
