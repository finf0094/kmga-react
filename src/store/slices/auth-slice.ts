import axios, {AxiosError} from 'axios';
import Cookies from 'js-cookie';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {baseUrl} from "@src/services/api";

enum Roles {
    ADMIN = "ADMIN",
    USER = "USER"
}

interface IUserResponse {
    id: string,
    email: string,
    updatedAt: string,
    roles: Roles
}

interface IAuthResponse {
    accessToken: string,
    user: IUserResponse
}

export const login = createAsyncThunk(
    'auth/login',
    async (loginData: { username: string; password: string; }, { rejectWithValue }) => {
        try {
            const response = await axios.post<IAuthResponse>(`${baseUrl}/auth/login`, loginData);
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError; // Явное приведение типа к AxiosError
            return rejectWithValue(axiosError.response?.data);
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        await axios.post(`${baseUrl}/auth/logout`);
        return;
    } catch (error) {
        const axiosError = error as AxiosError; // Явное приведение типа к AxiosError
        return rejectWithValue(axiosError.response?.data);
    }
});

const initializeAuthStateFromCookies = () => {
    const isAuthenticated: boolean = Cookies.get('isAuthenticated') === 'true';
    const accessToken: string = Cookies.get('access_token') || '';
    const user: IUserResponse = JSON.parse(Cookies.get('user') || '{}');

    return { isAuthenticated, accessToken, user };
};

const initialState = initializeAuthStateFromCookies();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.accessToken = action.payload.accessToken;
                state.user = action.payload.user;

                Cookies.set('isAuthenticated', 'true', { expires: 1 });
                Cookies.set('access_token', action.payload.accessToken); // Исправлено на прямое сохранение строки
                Cookies.set('user', JSON.stringify(action.payload.user));
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.accessToken = '';
                state.user = {} as IUserResponse;

                Cookies.remove('isAuthenticated');
                Cookies.remove('access_token');
                Cookies.remove('user');
            });
    },
});

export default authSlice.reducer;