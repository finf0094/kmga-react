import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {setupListeners} from "@reduxjs/toolkit/query";


// REDUCER
import authReducer from "./slices/auth-slice.ts";

// API
import {quizApi} from "@store/api";


// Объединение редьюсеров с поддержкой Redux Persist
const rootReducer = combineReducers({
    auth: authReducer,
    [quizApi.reducerPath]: quizApi.reducer,
});

// Создание хранилища
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(
            quizApi.middleware
        ),
});

// Настройка Redux Toolkit Query listeners
setupListeners(store.dispatch);


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Экспорт хранилища и persistor
export {store};