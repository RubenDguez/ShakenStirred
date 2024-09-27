import { useCallback } from "react";

export default function useAuthorization() {
    const setJwt = useCallback((token: string) => {
        window.localStorage.setItem('jwt', token);
    }, []);

    const getJwt = useCallback(() => {
        return window.localStorage.getItem('jwt');
    },[]);

    const isJwtExpired = useCallback(() => {
        const jwt = getJwt();
        if (!jwt) return true;

        const jwtData = JSON.parse(atob(jwt.split('.')[1]));
        const expiration = jwtData.exp * 1000;
        return Date.now() >= expiration;
    }, [getJwt]);

    return {setJwt, getJwt, isJwtExpired}
}
