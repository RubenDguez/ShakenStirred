import { motion } from 'framer-motion';
import { Dispatch, useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthorization from '../../hooks/useAuthorization';
import { login } from '../../api/authAPI';

export default function Login({ setIsLogin }: { setIsLogin: Dispatch<React.SetStateAction<boolean>> }) {
  const {setJwt} = useAuthorization({secure: false});

  const [error, setError] = useState('');

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const navigate = useNavigate();

  const handleLoginFormSubmission = useCallback(async(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      setError('All fields are required');
      usernameRef.current?.focus()
      return;
    }

    try {
      const response = await login({username, password});
      setJwt(response.token);
      navigate('/app');
    } catch (error) {
      const ERROR = error as string;
      setError(ERROR)
    }
  }, [navigate, setJwt]);

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
            <h3 style={{ width: '50%' }}>Login</h3>
            <p style={{ width: '50%' }}>
              Discover, create, and share your favorite drink recipes with fellow enthusiasts. Whether you&apos;re mixing up a classic or crafting something new, you&apos;ve come
              to the right place. Let’s shake things up—one drink at a time!
            </p>
          </div>
        </div>
        <div
          style={{
            width: '50%',
            height: '600px',
            padding: '1rem',
            display: 'flex',
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
              <label htmlFor="username">Username</label>
              <input
                ref={usernameRef}
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
            </div>
            <div>
              <h5>
                Don&apos;t have an account? Click{' '}
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
                to create one.
              </h5>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
