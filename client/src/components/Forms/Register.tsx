import { motion } from 'framer-motion';
import { Dispatch, useCallback, useEffect, useRef, useState } from 'react';
import { signUp } from '../../api/authAPI';
import useAuthorization from '../../hooks/useAuthorization';
import { useNavigate } from 'react-router-dom';

export default function Register({ setIsLogin }: { setIsLogin: Dispatch<React.SetStateAction<boolean>> }) {
  const [error, setError] = useState('');

  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const authorization = useAuthorization()
  const navigate = useNavigate();

  useEffect(() => {
    if (!authorization.isJwtExpired()) {
      navigate('/app')
    }
  }, [authorization, navigate]);

  const handleLoginFormSubmission = useCallback(async(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
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
      const response = await signUp({email, username, password});
      authorization.setJwt(response.token);

      formRef.current?.reset()
    } catch (error) {
      const ERROR = error as string;
      setError(ERROR)
    }

  }, [authorization]);

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
      style={{
        width: '1300px',
        height: '600px',
        overflow: 'hidden',
      }}
      initial={{
        height: 0,
      }}
      animate={{
        height: 600,
      }}
      transition={{
        duration: 1,
      }}
      exit={{
        height: 0,
        zIndex: -10,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row-reverse',
        }}
      >
        <div
          style={{
            width: '50%',
            height: '600px',
            padding: '1rem',
            display: 'grid',
            placeContent: 'center',
            backgroundColor: 'skyblue',
            color: 'black',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              gap: '1rem',
            }}
          >
            <h3 style={{ width: '50%' }}>Register</h3>
            <p style={{ width: '50%' }}>
              Unlock a world of flavors by creating your own drink recipes, saving your favorites, and connecting with fellow mixologists. Whether you&apos;re a cocktail
              connoisseur or just getting started, registering opens the door to endless possibilities. Your next great creation is just a shake away—let&apos;s get started!
            </p>
          </div>
        </div>
        <div
          style={{
            width: '50%',
            height: '600px',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <form
            ref={formRef}
            style={{
              width: '400px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {error !== '' && (
              <h5
                style={{
                  backgroundColor: 'tomato',
                  color: 'orange',
                  width: '100%',
                  padding: '0.5rem 1rem',
                  marginBottom: '1rem',
                  textAlign: 'center',
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                }}
              >
                {error}
              </h5>
            )}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: '1rem',
              }}
            >
              <label htmlFor="email">Email</label>
              <input
                ref={emailRef}
                required
                style={{
                  padding: '0.5rem',
                  border: 'none',
                  borderRadius: '4px',
                }}
                type="email"
                id="email"
                name="email"
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: '1rem',
              }}
            >
              <label htmlFor="username">Username</label>
              <input
                ref={usernameRef}
                required
                style={{
                  padding: '0.5rem',
                  border: 'none',
                  borderRadius: '4px',
                }}
                type="text"
                id="username"
                name="username"
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: '1rem',
              }}
            >
              <label htmlFor="password">Password</label>
              <input
                ref={passwordRef}
                required
                style={{
                  padding: '0.5rem',
                  border: 'none',
                  borderRadius: '4px',
                }}
                type="password"
                id="password"
                name="password"
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: '1rem',
              }}
            >
              <input
                onClick={(e) => handleLoginFormSubmission(e)}
                style={{ cursor: 'pointer', padding: '0.75rem', marginTop: '1rem', textTransform: 'uppercase', fontWeight: '600', border: 'none', borderRadius: '4px' }}
                type="submit"
                id="submit"
                name="submit"
                value="Submit"
              />
              <h5>
                Already have an account Click{' '}
                <span>
                  <button
                    style={{
                      cursor: 'pointer',
                      padding: '0.15rem 0.55rem',
                      textTransform: 'uppercase',
                      backgroundColor: 'orange',
                      border: 'none',
                      borderRadius: '4px',
                      fontWeight: '600',
                    }}
                    onClick={(e) => handleSwitchLoginSignup(e)}
                  >
                    here
                  </button>
                </span>{' '}
                to login.
              </h5>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
