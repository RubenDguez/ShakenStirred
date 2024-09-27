import { useEffect, useState } from 'react';

export default function useAuthorize() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const jwt = window.localStorage.getItem('jwt');
    setIsAuthorized(jwt !== null);
  }, []);

  return { isAuthorized };
}
