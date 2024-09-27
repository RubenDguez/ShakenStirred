import { useParams } from 'react-router-dom';
import useAuthorization from '../hooks/useAuthorization';

export default function Drink() {
  const {getJwt} = useAuthorization();
  if (getJwt() === null) throw new Error('Not Authorized')

  const { id } = useParams();
  return (
    <div>
      <h2>this is the Drink page</h2>
      <p>{id}</p>
    </div>
  );
}
