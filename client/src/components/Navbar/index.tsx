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
  { label: 'home', to: '/app' },
  { label: 'new', to: '/app/new' },
  { label: 'my drinks', to: '/app/my-drinks' },
  { label: 'search', to: '/app/search' },
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
        <motion.div layout>
          {NAVIGATION_BUTTONS.map((button) => (
            <NavbarButton key={button.label} to={button.to} action={button.action}>
              {button.label}
            </NavbarButton>
          ))}
        </motion.div>
        <NavbarAvatar src="/Argenis.jpeg" />
      </div>
    </motion.nav>
  );
}

function NavbarAvatar({ src }: { src: string }) {
  const navigate = useNavigate();
  return (
    <motion.div
      onClick={() => navigate('/app/user')}
      style={{ backgroundImage: `url(${src})` }}
      className={`${styles.avatar}`}
      layout
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'linear' }}
      exit={{ opacity: 0, scale: 0 }}
      whileHover={{ scale: 1.25, rotate: '5deg' }}
      whileTap={{ scale: 1.15, rotate: '0deg' }}
    ></motion.div>
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
