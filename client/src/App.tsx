import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import useAuthorization from './hooks/useAuthorization';

function App() {
  useAuthorization();

  return (
    <main
      style={{
        margin: '0px auto',
        padding: '0px 2rem',
        maxWidth: '1200px',
        height: '100vh',
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
      }}
    >
      <Navbar />
      <Outlet />
    </main>
  );
}

export default App;
