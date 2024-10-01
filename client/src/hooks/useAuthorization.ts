import { useCallback, useEffect } from "react";
import { json } from "react-router-dom";
import {jwtDecode, JwtPayload} from 'jwt-decode';

interface IUser {
    username: string;
    firstName: string;
    lastName: string;
    iat: number;
    exp: number;
  }

export default function useAuthorization(options = {secure: true}) {
    const setJwt = useCallback((token: string) => {
        window.localStorage.setItem('jwt', token);
    }, []);

    const getJwt = useCallback(() => {
        return window.localStorage.getItem('jwt');
    },[]);

    const removeJwt = useCallback(() => {
        window.localStorage.removeItem('jwt');
    }, []);

    const getDecoded = useCallback(() => {
        const jwt = getJwt();
        if (!jwt) return null;
        return jwtDecode<JwtPayload & IUser>(jwt);
    }, [getJwt]);

    const isJwtExpired = useCallback(() => {
        const jwt = getJwt();
        if (!jwt) return true;

        const jwtData = JSON.parse(atob(jwt.split('.')[1]));
        const expiration = jwtData.exp * 1000;
        return Date.now() >= expiration;
    }, [getJwt]);

    useEffect(() => {
        // console.clear();
        if (options.secure && getJwt() === null) throw json({ message: 'Unauthorized' }, { status: 401 });
    }, [getJwt, options.secure]);

    return {setJwt, getJwt, isJwtExpired, removeJwt, getDecoded}
}
