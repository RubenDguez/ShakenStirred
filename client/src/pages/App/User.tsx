import { motion } from 'framer-motion';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import AnimatedPageWrapper from '../../components/AnimatedPageWrapper';
import useAuthorization from '../../hooks/useAuthorization';
import { AppContext } from '../../App';
import { updateUser } from '../../api/userAPI';
import { useNavigate } from 'react-router-dom';

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
          padding: '3rem',
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
          ></motion.div>
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
  const app = useContext(AppContext);
  const { getJwt } = useAuthorization();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSaveUser = useCallback(async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    try {
      await updateUser(
        {
          username,
          firstName,
          lastName,
          email,
          updatedAt: new Date(),
        },
        getJwt()!,
      );
      navigate(0);
    } catch (error) {
      const ERROR = error as Error;
      console.error(ERROR.message);
    }
  }, [username, firstName, lastName, email, getJwt, navigate]);

  useEffect(() => {
    const _username = app?.username || '';
    const _firstName = app?.firstName || '';
    const _lastName = app?.lastName || '';
    const _email = app?.email || '';

    setUsername(_username);
    setFirstName(_firstName);
    setLastName(_lastName);
    setEmail(_email);
  }, [app]);

  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label htmlFor="username">Username</label>
        <input
          value={username}
          onChange={(e) => setFirstName(e.target.value)}
          style={{ padding: '0.45rem', border: '1px solid black', borderRadius: '4px' }}
          disabled
          type="text"
          id="username"
          name="username"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label htmlFor="firstName">First Name</label>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={{ padding: '0.45rem', border: '1px solid black', borderRadius: '4px' }}
          type="text"
          id="firstName"
          name="firstName"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label htmlFor="lastName">Last Name</label>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={{ padding: '0.45rem', border: '1px solid black', borderRadius: '4px' }}
          type="text"
          id="lastName"
          name="lastName"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '0.45rem', border: '1px solid black', borderRadius: '4px' }}
          type="text"
          id="email"
          name="email"
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'right', marginTop: '2rem' }}>
        <button onClick={(e) => handleSaveUser(e)} type="submit">
          Save
        </button>
      </div>
    </form>
  );
}
