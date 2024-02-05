import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "@store";
import {refreshTokens} from "@store/slices";

const AuthSuccess: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(refreshTokens())
        navigate('/dashboard');
    }, [dispatch, navigate]);

    return (
        <div>
            Authenticating...
        </div>
    );
};

export default AuthSuccess;