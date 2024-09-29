import { motion } from 'framer-motion';
import { Dispatch, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../api/authAPI';
import useAuthorization from '../../hooks/useAuthorization';
import styles from './styles.module.css';

export default function Register({ setIsLogin }: { setIsLogin: Dispatch<React.SetStateAction<boolean>> }) {
  const [error, setError] = useState('');

  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { isJwtExpired, setJwt } = useAuthorization({ secure: false });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isJwtExpired()) {
      navigate('/app');
    }
  }, [isJwtExpired, navigate]);

  const handleLoginFormSubmission = useCallback(
    async (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      const email = emailRef.current?.value;
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;

      if (!email || !username || !password) {
        setError('All fields are required');
        return;
      }

      /**
       * In summary, this regular expression pattern is designed to match and validate email addresses.
       * It ensures that the email address has at least one character before and after the @ symbol,
       * and that it contains a dot (.) followed by at least one character after the dot.
       */
      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          setError('Invalid email address');
          return;
        }
      }

      /**
       * 5 to 30 alphanumeric characters, with no other characters before or after the string.
       */
      if (username) {
        const usernameRegex = /^[a-zA-Z0-9.]{5,30}$/;
        if (!usernameRegex.test(username)) {
          setError('Invalid username');
          return;
        }
      }

      /**
       * It contains at least one lowercase letter.
       * It contains at least one uppercase letter.
       * It contains at least one digit.
       * It is at least 8 characters long.
       */
      if (password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
          setError('Invalid password');
          return;
        }
      }

      setError('');

      try {
        const response = await signUp({ email, username, password });
        setJwt(response.token);

        formRef.current?.reset();
      } catch (error) {
        const ERROR = error as string;
        setError(ERROR);
      }
    },
    [setJwt],
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
      initial={{ x: '-100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      exit={{ x: '-100%', opacity: 0 }}
      className={`${styles.flexCenterReversed}`}
    >
      <div className={`${styles.flexCenter} ${styles.column}`}>
        <div className={`${styles.flexCenter} ${styles.message}`}>
          <h3>Register</h3>
          <p>
            Unlock a world of flavors by creating your own drink recipes, saving your favorites, and connecting with fellow mixologists. Whether you&apos;re a cocktail connoisseur
            or just getting started, registering opens the door to endless possibilities. Your next great creation is just a shake away—let&apos;s get started!
          </p>
        </div>
      </div>

      <div className={`${styles.flexCenter} ${styles.column}`}>
        <form className={`${styles.flexCenter} ${styles.form} ${styles.registerForm}`} ref={formRef}>
          {error !== '' && <h5 className={`${styles.formError}`}>{error}</h5>}
          <div className={`${styles.formField}`}>
            <label htmlFor="email">Email</label>
            <input ref={emailRef} required type="email" id="email" name="email" />
          </div>
          <div className={`${styles.formField}`}>
            <label htmlFor="username">Username</label>
            <input ref={usernameRef} required type="text" id="username" name="username" />
          </div>
          <div className={`${styles.formField}`}>
            <label htmlFor="password">Password</label>
            <input ref={passwordRef} required type="password" id="password" name="password" />
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
              Already have an account Click <span onClick={handleSwitchLoginSignup}>here</span> to login.
            </h5>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
