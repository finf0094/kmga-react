import { useState } from "react";
import { useAppDispatch } from "@store";
import { login } from "@store/slices";

const Login = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    const handleGoogleAuth = async () => {
        window.open(`${import.meta.env.VITE_API_URL}/api/auth/google`, `_self`);
    };

    const handleYandexAuth = async  () => {
        window.open(`${import.meta.env.VITE_API_URL}/api/auth/yandex`, `_self`);
    }

    return (
        <div>
            <h2>Вход в систему</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Имя пользователя:</label>
                    <input
                        id="username"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Пароль:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Войти</button>
            </form>
            <button onClick={handleGoogleAuth}>Войти через Google</button>
            <button onClick={handleYandexAuth}>Войти через Yandex</button>
        </div>
    );
};

export default Login;
