import { createApi } from "@reduxjs/toolkit/query/react";
import { IQuestion } from "@src/interfaces";
import { baseQueryWithReauth } from "@src/services/api/baseQuery.ts";




interface ICreateQuestion {
    quizId: string;
    title: string;
    options: {
        value: string;
        weight: number;
    }[];
}

interface IUpdateQuestion {
    title: string;
    options: {
        id: string
        value: string;
        weight: number;
    }[];
}

export const questionApi = createApi({
    reducerPath: 'questionApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getAllQuestions: builder.query<IQuestion[], string | undefined>({
            query: (quizId) => `quizzes/${quizId}/questions`,
        }),
        getQuestionById: builder.query<IQuestion, { quizId: string, questionId: string }>({
            query: ({ quizId, questionId }) => ({
                url: `/quizzes/${quizId}/questions/${questionId}`,
                method: 'GET',
            })
        }),
        createQuestion: builder.mutation<IQuestion, { quizId: string, question: ICreateQuestion }>({
            query: ({ quizId, question }) => ({
                url: `quizzes/${quizId}/questions`,
                method: 'POST',
                body: question,
            }),
        }),
        updateQuestion: builder.mutation<IQuestion, { id: string, question: IUpdateQuestion }>({
					query: ({ id, question }) => ({
						url: `questions/${id}`,
						method: 'PUT',
						body: question,
					}),
				}),
        deleteQuestion: builder.mutation<void, string>({
					query: (id) => ({
						url: `questions/${id}`,
						method: 'DELETE',
					}),
				}),
        getQuestionStatistics: builder.query<void, string>({
					query: (questionId) => `questions/${questionId}/statistics`,
				}),
    }),
});

export const {
    useGetAllQuestionsQuery,
    useCreateQuestionMutation,
    useDeleteQuestionMutation,
    useUpdateQuestionMutation,
    useGetQuestionByIdQuery,
    useGetQuestionStatisticsQuery
} = questionApi;
