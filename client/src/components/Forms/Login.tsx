import { motion } from 'framer-motion';
import { Dispatch, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ setIsLogin }: { setIsLogin: Dispatch<React.SetStateAction<boolean>> }) {
  const navigate = useNavigate();

  const handleLoginFormSubmission = useCallback((e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    navigate('/app');

    console.log('start login in process...');
  }, [navigate]);

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
        backgroundColor: 'blue',
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
            style={{
              width: '400px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
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
