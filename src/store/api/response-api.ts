import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@src/services/api";

interface Question {
  questionId: string;
  optionId: string;
}

interface CreateResponsePayload {
  userId: string;
  quizId: string;
  questions: Question[];
}

interface ResponseOption {
  id: string;
  value: string;
}

interface ResponseQuestion {
  Question: {
    id: string;
    title: string;
    options: ResponseOption[];
  };
  Option: ResponseOption;
}

interface QuizResponse {
  id: string;
  User: {
    id: string;
    email: string;
    updatedAt: string;
    roles: string[];
  };
  Quiz: {
    id: string;
    title: string;
  };
  ResponseQuestion: ResponseQuestion[];
  createdAt: string;
  updatedAt: string;
}


export const responseApi = createApi({
  reducerPath: 'responseApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createResponse: builder.mutation<void, CreateResponsePayload>({
      query: ({ userId, quizId, questions }) => ({
        url: `response`,
        method: 'POST',
        body: { userId, quizId, questions },
      }),
    }),
    getResponse: builder.query<QuizResponse, string>({
      query: (responseId: string) => ({
        url: `response/${responseId}`,
        method: 'GET',
      })
    }),
  }),
});

export const { useCreateResponseMutation, useGetResponseQuery } = responseApi;
