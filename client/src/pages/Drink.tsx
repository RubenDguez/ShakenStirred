import { useParams } from 'react-router-dom';
import useAuthorize from '../hooks/useAuthorize';

export default function Drink() {
  const {isAuthorized} = useAuthorize();

  if (!isAuthorized) throw new Error('Not Authorized')

  const { id } = useParams();
  return (
    <div>
      <h2>this is the Drink page</h2>
      <p>{id}</p>
    </div>
  );
}
