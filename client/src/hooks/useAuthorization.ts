import { useCallback, useEffect } from "react";
import { json } from "react-router-dom";

export default function useAuthorization(options = {secure: true}) {
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

    useEffect(() => {
        console.clear();
        if (options.secure && getJwt() === null) throw json({ message: 'Unauthorized' }, { status: 401 });
    }, [getJwt, options.secure]);

    return {setJwt, getJwt, isJwtExpired}
}
