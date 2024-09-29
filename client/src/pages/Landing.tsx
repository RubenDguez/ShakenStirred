import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Login from '../components/Forms/Login';
import Register from '../components/Forms/Register';
import useAuthorization from '../hooks/useAuthorization';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

export default function LandingPage() {
  const [isLogin, setIsLogin] = useState(true);

  const { getJwt, isJwtExpired } = useAuthorization({ secure: false });
  const navigate = useNavigate();

  useEffect(() => {
    if (getJwt() !== null && !isJwtExpired()) navigate('/app');
  }, [getJwt, isJwtExpired, navigate]);

  return (
    <div className={`${styles.landingPage}`}>
      <div className={`${styles.landing}`}>
        <div className={`${styles.loginWrapper}`}>
          <AnimatePresence initial={false} mode='wait'>
            {isLogin && <Login key={'login'} setIsLogin={setIsLogin} />}
            {!isLogin && <Register key={'register'} setIsLogin={setIsLogin} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
