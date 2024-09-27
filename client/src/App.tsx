import { json } from "react-router-dom";
import useAuthorization from "./hooks/useAuthorization";

function App() {
  const {getJwt} = useAuthorization()
  if (getJwt() === null) throw json({ message: 'Unauthorized' }, { status: 401 });

  return (
    <>
      <h1>This is the main app</h1>
    </>
  );
}

export default App;
