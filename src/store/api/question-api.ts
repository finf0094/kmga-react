import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReauth} from "@src/services/api/baseQuery.ts";


interface IQuestion {
    id: string;
    title: string;
    quizId: string;
    options: {
        id: string;
        value: string;
        isCorrect: boolean;
        questionId: string;
    }[];
}

interface IQuestionCreate {
    quizId: string;
    title: string;
    options: {
        value: string;
        isCorrect: boolean;
    }[];
}

interface IQuestionUpdate {
    quizId: string;
    title: string;
    options: {
        id: string
        value: string;
        isCorrect: boolean;
    }[];
}

export const questionApi = createApi({
    reducerPath: 'quizApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getAllQuestion: builder.query<{id: string, title: string}, string>({
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
            query: ({quizId, title, options}: IQuestionUpdate) => ({
                url: `/question/${quizId}`,
                method: 'PUT',
                body: {title: title, options: options}
            })
        }),
        deleteQuestion: builder.query<void, string>({
            query: (id: string) => ({
                url: `/question/${id}`,
                method: 'DELETE'
            })
        }),
        getQuestionStatistics: builder.query<{question: string, options: {value: string, count: number}, updatedAt: string }, string>({
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
    useDeleteQuestionQuery,
    useGetQuestionByIdQuery,
    useGetQuestionStatisticsQuery
} = questionApi;
