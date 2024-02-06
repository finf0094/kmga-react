import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {setupListeners} from "@reduxjs/toolkit/query";


// REDUCER
import authReducer from "./slices/auth-slice.ts";
import modalReducer from "@store/slices/modal-slice.ts";

// API
import {quizApi} from "@store/api";
import { questionApi } from './api/question-api.ts';
import { responseApi } from './api/response-api.ts';



// Объединение редьюсеров с поддержкой Redux Persist
const rootReducer = combineReducers({
    auth: authReducer,
    modal: modalReducer,
    [quizApi.reducerPath]: quizApi.reducer,
    [questionApi.reducerPath]: questionApi.reducer,
    [responseApi.reducerPath]: responseApi.reducer,
});

// Создание хранилища
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(
            quizApi.middleware, questionApi.middleware, responseApi.middleware,
        ),
});

// Настройка Redux Toolkit Query listeners
setupListeners(store.dispatch);


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Экспорт хранилища и persistor
export {store};