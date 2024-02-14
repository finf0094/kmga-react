import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {setupListeners} from "@reduxjs/toolkit/query";


// REDUCER
import authReducer from "./slices/auth-slice.ts";
import modalReducer from "@store/slices/modal-slice.ts";

// API
import {questionApi, quizApi, sessionApi} from "@store/api";



// Объединение редьюсеров с поддержкой Redux Persist
const rootReducer = combineReducers({
    auth: authReducer,
    modal: modalReducer,
    [quizApi.reducerPath]: quizApi.reducer,
    [questionApi.reducerPath]: questionApi.reducer,
    [sessionApi.reducerPath]: sessionApi.reducer,
});

// Создание хранилища
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(
            quizApi.middleware, questionApi.middleware,
            sessionApi.middleware
        ),
});

// Настройка Redux Toolkit Query listeners
setupListeners(store.dispatch);


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Экспорт хранилища и persistor
export {store};