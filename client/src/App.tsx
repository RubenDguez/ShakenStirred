import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import useAuthorization from './hooks/useAuthorization';
import MainMenu from './components/MainMenu';
import { createContext, useEffect, useState } from 'react';
import { getUser } from './api/userAPI';

export const AppContext = createContext<IUser | null>(null);

function App() {
  const { getDecoded, getJwt } = useAuthorization();
  const decoded = getDecoded();

  const [application, setApplication] = useState<IUser | null>(null);

  useEffect(() => {
    async function fetch() {
      const userData = await getUser(decoded!.username, getJwt()!);
      setApplication(userData);
    }

    fetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContext.Provider value={application}>
      <main>
        <Navbar />
        <section style={{ display: 'flex', paddingTop: '5rem' }}>
          <MainMenu />
          <div style={{ width: '100%' }}>
            <Outlet />
          </div>
        </section>
      </main>
    </AppContext.Provider>
  );
}

export default App;
