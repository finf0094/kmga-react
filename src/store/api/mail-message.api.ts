import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@src/services/api';
import { MailMessage } from '@interfaces';


export const mailMessageApi = createApi({
    reducerPath: 'mail-message',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['MailMessage'],
    endpoints: (builder) => ({
        getAllMailMessages: builder.query<MailMessage[], { quizId: string }>({
            query: ({ quizId }) => ({
                url: '/mail-messages',
                params: { quizId },
            }),
            providesTags: ['MailMessage'],
        }),
        getMailMessageById: builder.query<MailMessage, { mailMessageId: string }>({
            query: ({ mailMessageId }) => `/mail-messages/${mailMessageId}`,
            providesTags: (result) => [{ type: 'MailMessage', id: result?.id }],
        }),
        createMailMessage: builder.mutation<MailMessage, Omit<MailMessage, 'id'>>({
            query: (data) => ({
                url: '/mail-messages',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['MailMessage'],
        }),
        updateMailMessage: builder.mutation<MailMessage, MailMessage>({
            query: ({ id, ...data }) => ({
                url: `/mail-messages/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result) => [{ type: 'MailMessage', id: result?.id }],
        }),
        deleteMailMessage: builder.mutation<void, string>({
            query: (id) => ({
                url: `/mail-messages/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['MailMessage'],
        }),
    }),
});

export const {
    useGetAllMailMessagesQuery: useMailMessages,
    useGetMailMessageByIdQuery: useMailMessageById,
    useUpdateMailMessageMutation: useUpdateMailMessage,
    useDeleteMailMessageMutation: useDeleteMailMessage,
    useCreateMailMessageMutation: useCreateMailMessage,
} = mailMessageApi;