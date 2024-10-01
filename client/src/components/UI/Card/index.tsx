import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import styles from './card.module.css';

export default function Card({ children }: { children: ReactNode }) {
  return <motion.section 
  transition={{ duration: 0.45 }}
  whileHover={{ scale: 1.005 }}
  className={`${styles.card}`}>
    {children}
    </motion.section>;
}
