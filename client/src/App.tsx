import { json } from "react-router-dom";
import useAuthorize from "./hooks/useAuthorize";

function App() {
  const {isAuthorized} = useAuthorize();
  if (!isAuthorized) throw json({ message: 'Unauthorized' }, { status: 401 });

  return (
    <>
      <h1>This is the main app</h1>
    </>
  );
}

export default App;
