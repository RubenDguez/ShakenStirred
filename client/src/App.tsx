import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import useAuthorization from './hooks/useAuthorization';
import MainMenu from './components/MainMenu';

function App() {
  useAuthorization();

  return (
    <main>
      <Navbar />
      <section style={{ display: 'flex' }}>
        <MainMenu />
        <div style={{ width: '100%' }}>
          <Outlet />
        </div>
      </section>
    </main>
  );
}

export default App;
