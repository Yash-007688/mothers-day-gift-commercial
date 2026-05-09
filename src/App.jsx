import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FloatingHearts from './components/FloatingHearts';
import EnvelopeCard from './components/EnvelopeCard';
import GreetingMessage from './components/GreetingMessage';
import MemoryGallery from './components/MemoryGallery';
import ReasonsSection from './components/ReasonsSection';
import RateTheLove from './components/RateTheLove';
import './App.css';

function App() {
  // 'envelope', 'greeting', 'gallery', 'reasons', 'rating'
  const [stage, setStage] = useState('envelope');

  return (
    <div className="app-container">
      <FloatingHearts count={stage === 'greeting' ? 25 : 10} />
      
      <main className="content-container">
        <AnimatePresence mode="wait">
          {stage === 'envelope' && (
            <motion.div key="envelope" exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}>
              <EnvelopeCard onOpen={() => setStage('greeting')} />
            </motion.div>
          )}

          {stage === 'greeting' && (
            <motion.div key="greeting" exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }}>
              <GreetingMessage onNext={() => setStage('gallery')} />
            </motion.div>
          )}

          {stage === 'gallery' && (
            <motion.div key="gallery" exit={{ opacity: 0, x: -50, transition: { duration: 0.5 } }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <MemoryGallery onNext={() => setStage('reasons')} />
            </motion.div>
          )}

          {stage === 'reasons' && (
            <motion.div key="reasons" exit={{ opacity: 0, x: -50, transition: { duration: 0.5 } }} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <ReasonsSection onNext={() => setStage('rating')} />
            </motion.div>
          )}

          {stage === 'rating' && (
            <motion.div key="rating" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
              <RateTheLove />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
