import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Login from '../components/Forms/Login';
import Register from '../components/Forms/Register';

export default function LandingPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      style={{
        height: '100vh',
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        maxWidth: 1200,
        margin: '0px auto'
      }}
    >
      <div>
        <h2>Shaken &amp; Stirred</h2>
      </div>
      <div
        style={{
          display: 'grid',
          placeContent: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: 'wheat',
            width: '1300px',
            height: '600px',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <AnimatePresence initial={false} mode="sync">
            {isLogin && <Login setIsLogin={setIsLogin} />}
          </AnimatePresence>
          <AnimatePresence initial={false} mode="sync">
            {!isLogin && <Register setIsLogin={setIsLogin} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
