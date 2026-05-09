import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import './MemoryGallery.css';

// Pre-defined sweet captions and secret messages to cycle through
const defaultCaptions = [
  { caption: 'Thank you for always being there for me.', secret: 'You are the most beautiful person inside and out! 🌸' },
  { caption: 'Your guidance has shaped who I am today.', secret: 'I love you to the moon and back! 🌙❤️' },
  { caption: 'Every day with you is a blessing.', secret: 'You make the world a better place. 💖' },
  { caption: 'My favorite memories are the ones with you.', secret: 'You are my superhero! 🦸‍♀️' },
  { caption: 'Your smile brightens up my life.', secret: 'No one compares to you, Mom! ✨' }
];

// Fallback demo images if the folder is empty
const demoMemories = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1000&auto=format&fit=crop',
    caption: defaultCaptions[0].caption,
    hiddenMessage: defaultCaptions[0].secret,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=1000&auto=format&fit=crop',
    caption: defaultCaptions[1].caption,
    hiddenMessage: defaultCaptions[1].secret,
  }
];

export default function MemoryGallery({ onNext }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  // Automatically load images from src/assets/memories/
  const memories = useMemo(() => {
    // Vite's import.meta.glob auto-imports files matching the pattern
    const imageModules = import.meta.glob('../assets/memories/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' });
    const imagePaths = Object.values(imageModules);

    if (imagePaths.length === 0) {
      return demoMemories;
    }

    // Map each loaded image to a predefined caption
    return imagePaths.map((imgPath, index) => {
      const captionData = defaultCaptions[index % defaultCaptions.length];
      return {
        id: index + 1,
        image: imgPath,
        caption: captionData.caption,
        hiddenMessage: captionData.secret,
      };
    });
  }, []);

  const nextMemory = () => {
    setShowSecret(false);
    setCurrentIndex((prev) => (prev === memories.length - 1 ? 0 : prev + 1));
  };

  const prevMemory = () => {
    setShowSecret(false);
    setCurrentIndex((prev) => (prev === 0 ? memories.length - 1 : prev - 1));
  };

  return (
    <motion.div 
      className="gallery-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="gallery-header">
        <h2 className="premium-text">Our Beautiful Memories</h2>
        <Heart className="header-icon" fill="var(--primary)" color="var(--primary)" size={24} />
      </div>

      <div className="carousel-container">
        <button className="nav-button prev glass-panel" onClick={prevMemory}>
          <ChevronLeft size={24} />
        </button>

        <div className="carousel-viewport">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="memory-card glass-panel"
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div 
                className="image-wrapper" 
                onClick={() => setShowSecret(!showSecret)}
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src={memories[currentIndex].image} 
                  alt={`Memory ${currentIndex + 1}`} 
                />
                
                <AnimatePresence>
                  {showSecret && (
                    <motion.div 
                      className="secret-overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <h3 className="secret-text">{memories[currentIndex].hiddenMessage}</h3>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="caption-wrapper">
                <p>{memories[currentIndex].caption}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--primary)', marginTop: '8px', cursor: 'pointer' }} onClick={() => setShowSecret(!showSecret)}>
                  Tap image for a secret message ✨
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button className="nav-button next glass-panel" onClick={nextMemory}>
          <ChevronRight size={24} />
        </button>
      </div>
      
      <div className="carousel-indicators">
        {memories.map((_, idx) => (
          <div 
            key={idx} 
            className={`indicator ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => {
              setShowSecret(false);
              setCurrentIndex(idx);
            }}
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
        I have one more thing for you...
      </motion.button>
    </motion.div>
  );
}
