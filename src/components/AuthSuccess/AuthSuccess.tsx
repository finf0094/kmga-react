import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {useAppDispatch} from "@store";
import {refreshTokens} from "@store/slices";

const AuthSuccess = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        // Предполагаем, что токен доступен в куках
        const refreshtoken = Cookies.get('refreshtoken');
        console.log(refreshtoken)

        if (refreshtoken) {
            dispatch(refreshTokens())
            navigate('/dashboard');
        } else {
            // Если токен не найден, перенаправляем на страницу входа
            navigate('/login');
        }
    }, [dispatch, navigate]);

    return (
        <div>Authenticating...</div>
);
};

export default AuthSuccess;