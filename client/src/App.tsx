import { Outlet } from 'react-router-dom';
import useAuthorization from './hooks/useAuthorization';
import Navbar from './components/Navbar';

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
        gridTemplateRows: 'auto 1fr auto'
      }}
    >
    <Navbar />
      <div>
        <Outlet />
      </div>
    </main>
  );
}

export default App;
