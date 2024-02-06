import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReauth} from "@src/services/api/baseQuery.ts";
import {IPagination, IQuiz, QuizStatus} from "@interfaces";



interface UserList {
    count: number;
    users: User[];
  }
  
  interface User {
    id: string;
    email: string;
    updatedAt: string;
    roles: string[];
    responseId: string;
  }

export const quizApi = createApi({
    reducerPath: 'quizApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getAllQuiz: builder.query<IPagination<IQuiz>, {page?: number, perPage?: number, search?: string, status?: QuizStatus | null}>({
            query: ({page = 1, perPage = 10, search = '', status = null}) => ({ // Use `status` here instead of `quizStatus`
                url: `/quiz?page=${page}&perPage=${perPage}&search=${search}&status=${status}`,
                method: 'GET',
            })
        }),

        createQuiz: builder.mutation<IQuiz, {title: string, description: string, status?: string, tags: string[]}>({
            query: ({title, description, tags, status}) => ({
                url: `/quiz`,
                method: 'POST',
                body: {title: title, description: description, tags: tags, status: status}
            })
        }),

        getQuizById: builder.query<IQuiz, string>({
            query: (id: string) => ({
                url: `/quiz/${id}`,
                method: 'GET'
            })
        }),

        getQuizByToken: builder.query<IQuiz, string>({
            query: (token: string) => ({
                url: `/quiz?token=${token}`,
                method: 'GET'
            })
        }),

        deleteQuizById: builder.mutation<void, string>({
            query: (id: string) => ({
                url: `/quiz/${id}`,
                method: 'DELETE'
            })
        }),

        updateQuiz: builder.mutation<IQuiz, {id: string, title: string, description: string, status: string, tags: string[]}>({
            query: ({id, title, tags, status, description}) => ({
                url: `quiz/${id}`,
                method: 'PATCH',
                body: {title, description, tags, status}
            })
        }),
        
        getStatistics: builder.query<UserList, string>({
            query: (quizId: string) => ({
                url: `quiz/${quizId}/stats`,
                method: 'GET',
            })
        })
    }),
});

export const {
    useGetAllQuizQuery,
    useGetQuizByIdQuery,
    useCreateQuizMutation,
    useDeleteQuizByIdMutation,
    useUpdateQuizMutation,
    useGetStatisticsQuery,
} = quizApi;
