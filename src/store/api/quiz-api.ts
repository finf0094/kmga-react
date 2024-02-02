import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReauth} from "@src/services/api/baseQuery.ts";


interface IQuiz {
    allowedEmails: string[];
    createdAt: string;
    description: string;
    id: string;
    status: string;
    tags: string[];
    title: string;
    updatedAt: string;
}

export const quizApi = createApi({
    reducerPath: 'quizApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getAllQuiz: builder.query<IQuiz, {page: number, perPage: number, search: string}>({
            query: ({page = 1, perPage = 10, search = ''}) => ({
                url: `/quiz?page=${page}&perPage=${perPage}&search=${search}`,
                method: 'GET',
            })
        }),

        createQuiz: builder.mutation<IQuiz, {title: string, description: string, status: string, tags: string[]}>({
            query: ({title, description, tags, status}) => ({
                url: `/quiz`,
                body: {title: title, description: description, tags: tags, status: status}
            })
        }),

        getQuizById: builder.query<IQuiz, string>({
            query: (id: string) => ({
                url: `/quiz/${id}`,
                method: 'GET'
            })
        }),

        deleteQuizById: builder.query<void, string>({
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
        })
    }),
});
export const {
    useGetAllQuizQuery,
} = quizApi;
