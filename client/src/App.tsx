import useAuthorization from './hooks/useAuthorization';

function App() {
  useAuthorization();

  return (
    <>
      <h1>This is the main app</h1>
    </>
  );
}

export default App;
