import { motion } from 'framer-motion';
import { useCallback, useRef } from 'react';
import AnimatedPageWrapper from '../../components/AnimatedPageWrapper';
import useAuthorization from '../../hooks/useAuthorization';

export default function User() {
  const updatePictureInputRef = useRef<HTMLInputElement>(null);
  useAuthorization();

  const handleUpdatePicture = useCallback(() => {
    updatePictureInputRef.current?.click();
  }, []);

  return (
    <AnimatedPageWrapper>
      <h2>User</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '3rem',
          padding: '3rem'
        }}
      >
        <UserForm />
        <div
          style={{
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'start',
          }}
        >
          <motion.div
            onClick={handleUpdatePicture}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.15, rotate: '5deg' }}
            whileTap={{ scale: 1.05, rotate: '0deg' }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'end',
              padding: '1rem',
              backgroundImage: `url(/Argenis.jpeg)`,
              width: 200,
              height: 200,
              backgroundSize: 'cover',
              borderRadius: '50%',
              backgroundPosition: 'center',
              cursor: 'pointer',
              overflow: 'hidden',
              color: 'white',
              textTransform: 'uppercase',
              fontWeight: '600',
            }}
          >
          </motion.div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <input ref={updatePictureInputRef} style={{ display: 'none' }} type="file" name="image" id="image" accept="image/png, image/jpeg" />
          </div>
        </div>
      </div>
    </AnimatedPageWrapper>
  );
}

function UserForm() {
  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label htmlFor="username">Username</label>
        <input style={{ padding: '0.45rem', border: '1px solid black', borderRadius: '4px' }} disabled type="text" id="username" name="username" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label htmlFor="firstName">First Name</label>
        <input style={{ padding: '0.45rem', border: '1px solid black', borderRadius: '4px' }} type="text" id="firstName" name="firstName" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label htmlFor="lastName">Last Name</label>
        <input style={{ padding: '0.45rem', border: '1px solid black', borderRadius: '4px' }} type="text" id="lastName" name="lastName" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label htmlFor="email">Email</label>
        <input style={{ padding: '0.45rem', border: '1px solid black', borderRadius: '4px' }} type="text" id="email" name="email" />
      </div>

    </form>
  );
}
