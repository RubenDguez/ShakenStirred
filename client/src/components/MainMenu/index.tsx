import { motion } from 'framer-motion';

import { FiSearch } from 'react-icons/fi';
import { GrLogout, GrTable } from 'react-icons/gr';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { IoHomeOutline } from 'react-icons/io5';

import { useCallback, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthorization from '../../hooks/useAuthorization';
import styles from './mainMenu.module.css';
import { AppContext } from '../../App';

interface IButton {
  icon: JSX.Element;
  label: string;
  to: string;
  action?: 'logout';
}

const asideActions: Array<IButton> = [
  { icon: <IoHomeOutline />, label: 'Home', to: '/app' },
  { icon: <IoIosAddCircleOutline />, label: 'New', to: '/app/new' },
  { icon: <GrTable />, label: 'My Drinks', to: '/app/my-drinks' },
  { icon: <FiSearch />, label: 'Search', to: '/app/search' },
];

export default function MainMenu() {
  const navigate = useNavigate();
  const app = useContext(AppContext);

  return (
    <aside className={`${styles.mainMenu}`}>
      <div>
        <div className={`${styles.user}`}>
          <motion.div
            onClick={() => navigate('/app/user')}
            transition={{ ease: 'easeInOut', duration: 1 }}
            whileHover={{ scale: 1.1 }}
            style={{ backgroundImage: `url(/Argenis.jpeg)` }}
            className={`${styles.userImage}`}
          ></motion.div>
          <h5><span>{app?.firstName}</span>{' '}<span>{app?.lastName}</span></h5>
        </div>
        <div>
        {asideActions.map((action) => (
          <AsideActionButtons key={action.label} {...action}>
            {action.label}
          </AsideActionButtons>
        ))}
        </div>
      </div>
      <AsideActionButtons icon={<GrLogout />} label='Logout' to='' action='logout' >Logout</AsideActionButtons>
    </aside>
  );
}

function AsideActionButtons({ children, icon, to, action }: { children: string } & IButton) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { removeJwt } = useAuthorization({ secure: false });

  const goto = useCallback(() => {
    if (action && action === 'logout') {
      removeJwt();
      navigate('/');
      return;
    }

    navigate(to);
  }, [navigate, to, removeJwt, action]);

  return (
    <motion.div
      onClick={goto}
      className={`${styles.asideActionButton} ${pathname === to && styles.active}`}
      style={{ fontWeight: pathname === to ? '600' : '300' }}
      transition={{ ease: 'easeInOut', duration: 0.25 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1.01 }}
    >
      {icon}
      <motion.h4 layout initial={{ y: '200%' }} animate={{ y: 0 }} transition={{ duration: 0.45 }} exit={{ y: '100%' }}>
        {children}
      </motion.h4>
    </motion.div>
  );
}
