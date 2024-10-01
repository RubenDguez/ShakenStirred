import { motion } from 'framer-motion';

import { FiSearch } from 'react-icons/fi';
import { GrLogout, GrTable } from 'react-icons/gr';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { IoHomeOutline } from 'react-icons/io5';

import styles from './mainMenu.module.css';
import { useNavigate } from 'react-router-dom';

const asideActions = [
  { icon: <IoHomeOutline />, label: 'Home' },
  { icon: <IoIosAddCircleOutline />, label: 'New' },
  { icon: <GrTable />, label: 'My Drinks' },
  { icon: <FiSearch />, label: 'Search' },
  { icon: <GrLogout />, label: 'Logout' },
];

export default function MainMenu() {
  const navigate = useNavigate();

  return (
    <aside className={`${styles.mainMenu}`}>
      <div className={`${styles.user}`}>
        <motion.div
          onClick={() => navigate('/app/user')}
          transition={{ ease: 'easeInOut', duration: 1 }}
          whileHover={{ scale: 1.1 }}
          style={{ backgroundImage: `url(/Argenis.jpeg)` }}
          className={`${styles.userImage}`}
        ></motion.div>
        <h5>Argenis Ruben Dominguez</h5>
      </div>
      {asideActions.map((action) => (
        <AsideActionButtons key={action.label} icon={action.icon}>
          {action.label}
        </AsideActionButtons>
      ))}
    </aside>
  );
}

function AsideActionButtons({ children, icon }: { children: string; icon: React.ReactNode }) {
  return (
    <motion.div className={`${styles.asideActionButton}`} transition={{ ease: 'easeInOut', duration: 0.25 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.01 }}>
      {icon}
      <motion.h4 layout initial={{ y: '200%' }} animate={{ y: 0 }} transition={{ duration: 0.45 }} exit={{ y: '100%' }}>
        {children}
      </motion.h4>
    </motion.div>
  );
}
