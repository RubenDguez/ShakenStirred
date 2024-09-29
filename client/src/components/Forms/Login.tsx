import { motion } from 'framer-motion';
import { Dispatch, useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/authAPI';
import useAuthorization from '../../hooks/useAuthorization';
import styles from './styles.module.css';

export default function Login({ setIsLogin }: { setIsLogin: Dispatch<React.SetStateAction<boolean>> }) {
  const { setJwt } = useAuthorization({ secure: false });

  const [error, setError] = useState('');

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const navigate = useNavigate();

  const handleLoginFormSubmission = useCallback(
    async (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;

      if (!username || !password) {
        setError('All fields are required');
        usernameRef.current?.focus();
        return;
      }

      try {
        const response = await login({ username, password });
        setJwt(response.token);
        navigate('/app');
      } catch (error) {
        const ERROR = error as string;
        setError(ERROR);
      }
    },
    [navigate, setJwt],
  );

  const handleSwitchLoginSignup = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsLogin((curr) => !curr);
    },
    [setIsLogin],
  );

  return (
    <motion.div
    initial={{ x: '100%', opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.45, ease: 'easeOut' }}
    exit={{ x: '100%', opacity: 0 }}
      className={`${styles.flexCenter}`}
    >
      <div className={`${styles.flexCenter} ${styles.column}`}>
        <div className={`${styles.flexCenter} ${styles.message}`}>
          <h3>Login</h3>
          <p>
            Discover, create, and share your favorite drink recipes with fellow enthusiasts. Whether you&apos;re mixing up a classic or crafting something new, you&apos;ve come to
            the right place. Let&apos;s shake things up—one drink at a time!
          </p>
        </div>
      </div>

      <div className={`${styles.flexCenter} ${styles.column}`}>
        <form className={`${styles.flexCenter} ${styles.form} ${styles.loginForm}`} ref={formRef}>
          {error !== '' && <h5 className={`${styles.formError}`}>{error}</h5>}
          <div className={`${styles.formField}`}>
            <label htmlFor="username">Username</label>
            <input ref={usernameRef} type="text" id="username" name="username" />
          </div>
          <div className={`${styles.formField}`}>
            <label htmlFor="password">Password</label>
            <input ref={passwordRef} type="password" id="password" name="password" />
          </div>
          <div className={`${styles.formField}`}>
            <motion.input
              transition={{ duration: 0.35 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
              onClick={(e) => handleLoginFormSubmission(e)}
              type="submit"
              id="submit"
              name="submit"
              value="Submit"
            />
          </div>
          <div className={`${styles.accountQuestion}`}>
            <h5>
              Don&apos;t have an account? click <span onClick={handleSwitchLoginSignup}>here</span> to create one.
            </h5>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
