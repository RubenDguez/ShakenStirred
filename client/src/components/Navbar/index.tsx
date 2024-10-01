import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './navbar.module.css';
import { useCallback } from 'react';
import useAuthorization from '../../hooks/useAuthorization';

interface IButtons {
  label: string;
  to: string;
  action?: 'logout';
}

const NAVIGATION_BUTTONS: Array<IButtons> = [
  { label: 'logout', to: '/', action: 'logout' },
];

export default function Navbar() {
  return (
    <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease: 'easeInOut' }} exit={{ opacity: 0 }} className={`${styles.navigation}`}>
      <motion.h2
        className={`${styles.brand}`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.25, ease: 'easeInOut' }}
        exit={{ opacity: 0, scale: 0 }}
      >
        Shake &apos;N Stirred
      </motion.h2>
      <div className={`${styles.buttonSection}`}>
        <motion.div className={`${styles.buttons}`} layout>
          {NAVIGATION_BUTTONS.map((button) => (
            <NavbarButton key={button.label} to={button.to} action={button.action}>
              {button.label}
            </NavbarButton>
          ))}
        </motion.div>
      </div>
    </motion.nav>
  );
}

function NavbarButton({ children, to, action }: { children: string } & Omit<IButtons, 'label'>) {
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const { removeJwt } = useAuthorization();

  const handleOnClick = useCallback(() => {
    switch (action) {
      case 'logout':
        removeJwt();
        navigate('/');
        break;
      default:
        navigate(to);
    }
  }, [action, navigate, to, removeJwt]);

  return (
    <motion.button
      className={styles.navbarButton}
      style={{ fontWeight: pathname === to ? '600' : '300' }}
      onClick={handleOnClick}
      layout
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      whileHover={{ scale: 1.25 }}
      whileTap={{ scale: 1.15 }}
    >
      {children}
    </motion.button>
  );
}
