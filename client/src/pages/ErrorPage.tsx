import { useEffect, useState } from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { motion } from 'framer-motion';

const ErrorPage = () => {
  const [message, setMessage] = useState({ status: 404, description: 'Page not found' });
  const error = useRouteError() as { status: number };

  useEffect(() => {
    switch (error.status) {
      case 401:
        setMessage({ status: 401, description: 'Unauthorized' });
        break;
      default:
        break;
    }
  }, [error.status]);

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      style={{
        display: 'grid',
        placeContent: 'center',
        height: '98vh',
        backgroundColor: 'var(--linearPrimarySecondary)'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <h2
          style={{
            paddingRight: '1rem',
            marginRight: '1rem',
            fontSize: '3rem',
            borderRight: '2px solid black',
          }}
        >
          {message.status}
        </h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
          }}
        >
          <p
            style={{
              textTransform: 'uppercase',
            }}
          >
            {message.description}
          </p>
          <Link
            style={{
              textDecoration: 'none',
            }}
            to="/"
          >
            Let&apos;s get you back to home
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default ErrorPage;
