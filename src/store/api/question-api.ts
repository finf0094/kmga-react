import {createApi} from "@reduxjs/toolkit/query/react";
import { IQuestion } from "@src/interfaces";
import {baseQueryWithReauth} from "@src/services/api/baseQuery.ts";




interface IQuestionCreate {
    quizId: string;
    title: string;
    options: {
        value: string;
        isCorrect: boolean;
    }[];
}

interface IQuestionUpdate {
    questionId: string;
    title: string;
    options: {
        id: string
        value: string;
        isCorrect: boolean;
    }[];
}

export const questionApi = createApi({
    reducerPath: 'questionApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getAllQuestion: builder.query<{id: string, title: string}[], string>({
            query: (quizId: string) => ({
                url: `/question/all/${quizId}`,
                method: 'GET',
            })
        }),
        getQuestionById: builder.query<IQuestion, string>({
            query: (id: string) => ({
                url: `/question/${id}`,
                method: 'GET',
            })
        }),
        createQuestion: builder.mutation<{ id: string, title: string}, IQuestionCreate>({
            query: ({quizId, title, options}: IQuestionCreate) => ({
                url: `/question/${quizId}`,
                method: 'POST',
                body: {title: title, options: options}
            })
        }),
        updateQuestion: builder.mutation<{ id: string, title: string}, IQuestionUpdate>({
            query: ({questionId, title, options}: IQuestionUpdate) => ({
                url: `/question/${questionId}`,
                method: 'PUT',
                body: {title: title, options: options}
            })
        }),
        deleteQuestion: builder.mutation<void, string>({
            query: (id: string) => ({
                url: `/question/${id}`,
                method: 'DELETE'
            })
        }),
        getQuestionStatistics: builder.query<{question: string, options: {value: string, count: number}[], updatedAt: string }, string>({
            query: (id: string) => ({
                url: `/question/${id}/statistics`,
                method: 'GET',
            })
        }),
    }),
});

export const {
    useGetAllQuestionQuery,
    useCreateQuestionMutation,
    useDeleteQuestionMutation,
    useUpdateQuestionMutation,
    useGetQuestionByIdQuery,
    useGetQuestionStatisticsQuery
} = questionApi;
