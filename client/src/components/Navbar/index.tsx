import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const NAVIGATION_BUTTONS = [
  { label: 'home', to: '/app' },
  { label: 'new', to: '/app/new' },
  { label: 'my drinks', to: '/app/my-drinks' },
  { label: 'search', to: '/app/search' },
];

export default function Navbar() {
  return (
    <motion.nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 0px',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      exit={{ opacity: 0 }}
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.25, ease: 'easeInOut' }}
        exit={{ opacity: 0, scale: 0 }}
      >
        Shaken &amp; Stirred
      </motion.h2>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        <motion.div
          layout
          style={{
            display: 'flex',
            gap: '1rem',
          }}
        >
          {NAVIGATION_BUTTONS.map((button) => (
            <NavbarButton key={button.label} to={button.to}>
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
      style={{
        cursor: 'pointer',
        borderRadius: '50%',
        backgroundImage: `url(${src})`,
        width: '64px',
        height: '64px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
      layout
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'linear' }}
      exit={{ opacity: 0, scale: 0 }}
      whileHover={{ scale: 1.25, rotate: '5deg' }}
      whileTap={{ scale: 1.15, rotate: '0deg' }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          backdropFilter: 'grayscale(100%)',
        }}
      ></div>
    </motion.div>
  );
}

function NavbarButton({ children, to }: { children: string; to: string }) {
  const { pathname } = useLocation();

  const navigate = useNavigate();
  return (
    <motion.button
      onClick={() => navigate(to)}
      style={{
        padding: '0.35rem 0.75rem',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        textTransform: 'uppercase',
        fontSize: 'small',
        border: 'none',
        color: (pathname === to) ? 'black' : 'gray',
        fontWeight: (pathname === to) ? '600' : 'normal',
      }}
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
