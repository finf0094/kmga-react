import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@src/services/api";
import {Session} from "@interfaces/session.ts";
import {IPagination, SessionStatus} from "@interfaces";

interface Option {
    value: string;
    isSelected: boolean;
}

interface Question {
    title: string;
    options: Option[];
}

interface SessionStatistics {
    createdAt: string;
    email: string;
    quizTitle: string;
    questions: Question[];
}

export const sessionApi = createApi({
    reducerPath: 'sessionApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getAllSession: builder.query<IPagination<Session>, {page: number, perPage?: number, search?: string, status?: SessionStatus | null}>({
            query:
                ({page = 1, perPage = 10, search = '', status = null}) =>
                `sessions?page${page}&perPage=${perPage}&search=${search}&status=${status}`
        }),
        getSession: builder.query<Session, string>({
            query: (sessionId) => `sessions/${sessionId}`,
        }),
        createSession: builder.mutation<void, { email: string; quizId: string }>({
            query: ({ email, quizId }) => ({
                url: 'sessions',
                method: 'POST',
                body: { email, quizId },
            }),
        }),
        deleteSession: builder.mutation<void, string>({
           query: (sessionId) => ({
               url: `sessions/${sessionId}`,
               method: 'DELETE'
           }),
        }),
        startQuiz: builder.mutation<void, string>({
            query: (quizSessionId) => ({
                url: `sessions/${quizSessionId}/start`,
                method: 'POST',
            }),
        }),
        submitAnswer: builder.mutation<void, { sessionId: string; questionId: string; answerId: string }>({
            query: ({ sessionId, questionId, answerId }) => ({
                url: `sessions/${sessionId}/submit-answer`,
                method: 'POST',
                body: { questionId, answerId },
            }),
        }),
        endQuiz: builder.mutation<{ quizSessionId: string }, string>({
            query: (quizSessionId) => ({
                url: `sessions/${quizSessionId}/end`,
                method: 'POST',
            }),
        }),

        sessionStatistics: builder.query<SessionStatistics, string>({
            query: (sessionId) => ({
                url: `statistics/session/${sessionId}`
            })
        }),

    }),
});

export const {
    useCreateSessionMutation,
    useSubmitAnswerMutation,
    useStartQuizMutation,
    useEndQuizMutation, useGetSessionQuery,
    useGetAllSessionQuery,
    useDeleteSessionMutation,
    useSessionStatisticsQuery
} = sessionApi;
