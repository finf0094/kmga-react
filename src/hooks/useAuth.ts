import { useSelector } from 'react-redux';
import {RootState} from "@store/store.ts";

const useAuth = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);
    const user = useSelector((state: RootState) => state.auth.user)
    return { isAuthenticated, accessToken, user };
};

export default useAuth;