import { motion } from 'framer-motion';

import { FiSearch } from 'react-icons/fi';
import { GrLogout, GrTable } from 'react-icons/gr';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';

import { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthorization from '../../hooks/useAuthorization';
import styles from './mainMenu.module.css';
import { AppContext } from '../../App';
import { GiInspiration } from 'react-icons/gi';
import { FaRegUser } from 'react-icons/fa';

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
  { icon: <GiInspiration />, label: 'Inspiration', to: '/app/inspiration' },
];

export default function MainMenu() {
  const [userImage, setUserImage] = useState('');
  const navigate = useNavigate();
  const app = useContext(AppContext);

  useEffect(() => {
    const userImg = app?.avatar || '/user-avatar-placeholder.jpg';
    setUserImage(userImg);
  }, [app]);

  return (
    <aside className={`${styles.mainMenu}`}>
      <div>
        <div className={`${styles.user}`}>
          <motion.div
            onClick={() => navigate('/app/user')}
            transition={{ ease: 'easeInOut', duration: 1 }}
            whileHover={{ scale: 1.1 }}
            style={{ backgroundImage: `url(${userImage})` }}
            className={`${styles.userImage}`}
          ></motion.div>
          <h5>
            <span>{app?.firstName}</span> <span>{app?.lastName}</span>
          </h5>
        </div>
        <div>
          {asideActions.map((action) => (
            <AsideActionButtons key={action.label} {...action}>
              {action.label}
            </AsideActionButtons>
          ))}
        </div>
      </div>
      <div>
        <AsideActionButtons icon={<FaRegUser />} label="User" to="/app/user">
          User
        </AsideActionButtons>
        <AsideActionButtons icon={<IoSettingsOutline />} label="User" to="/app/settings">
          Settings
        </AsideActionButtons>
        <AsideActionButtons icon={<GrLogout />} label="Logout" to="" action="logout">
          Logout
        </AsideActionButtons>
      </div>
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
