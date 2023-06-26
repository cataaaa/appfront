import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';
import { startLogout } from '../store/auth/thunks';
import { login } from '../store/auth/authSlice';
import axios from 'axios';

export const useCheckAuth = () => {
    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const validateToken = () => {
        const tokenStorage = localStorage.getItem('token');
        const userStorage = localStorage.getItem('user');
        
        if (!tokenStorage) dispatch(startLogout())

        
         //axios.get("http://CENWAPPRD02:5010/api/Usuarios", {
           axios.get("http://localhost:5010/api/Usuarios", {
            headers: {
                'Authorization': `Bearer ${tokenStorage}`
            }
        })
            .then((response) => {
                // console.log(response)
                // console.log(response.statusText)
            })
            .catch((error) => {
                
                dispatch(startLogout())
            })
        
        const payload = {
            token: tokenStorage,
            user: JSON.parse(userStorage),
        }
        
        return dispatch(login(payload));
    }
    useEffect(() => {
        validateToken();
    }, []);

    return status;
}