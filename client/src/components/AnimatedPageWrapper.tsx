import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function AnimatedPageWrapper({ children }: { children: ReactNode }) {
  return (
    <AnimatePresence>
      <motion.div
        style={{
          padding: '2rem',
          borderRadius: '4px',
        }}
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.25 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
