import {BaseQueryApi, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RootState} from "@store/store.ts";
import {logout, refreshTokens} from "@store/slices";

export const baseUrl = import.meta.env.VITE_API_URL + "/api"


export const baseQuery = fetchBaseQuery({
    baseUrl,
    credentials: 'include',
    prepareHeaders: (headers: Headers, { getState }) => {
        const state = getState() as RootState;

        const accessToken = state.auth.accessToken
        if (accessToken) {
            headers.set('Authorization', `${accessToken}`)
        }
        return headers;
    }
})

export const baseQueryWithReauth = async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: object,
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && 'status' in result.error && result.error.status === 401) {
        // Attempt to refresh tokens
        const refreshResult = await api.dispatch(refreshTokens());
        if (refreshTokens.fulfilled.match(refreshResult)) {
            // If the refresh was successful, retry the original request
            result = await baseQuery(args, api, extraOptions);
        } else {
            // If the refresh failed, possibly dispatch logout or handle accordingly
            api.dispatch(logout());
        }
    }

    return result;
};