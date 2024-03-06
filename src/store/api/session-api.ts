import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@src/services/api";
import { Session } from "@interfaces/session.ts";

export interface Option {
  value: string;
  count: number;
  isSelected?: boolean;
  weight: number;
}

interface Question {
  title: string;
  options: Option[];
}

interface SessionStatistics {
  createdAt: string;
  email: string;
  feedBack: string;
  averageWeight: number;
  quizTitle: string;
  questions: Question[];
}

export const sessionApi = createApi({
  reducerPath: "sessionApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getSession: builder.query<Session, string>({
      query: (sessionId) => `sessions/${sessionId}`,
    }),
    createSession: builder.mutation<void, { email: string; quizId: string }>({
      query: ({ email, quizId }) => ({
        url: "sessions",
        method: "POST",
        body: { email, quizId },
      }),
    }),
    sendSessionToEmail: builder.mutation<
      void,
      { sessionId: string; language: string }
    >({
      query: ({ sessionId, language }) => ({
        url: `sessions/${sessionId}/send/${language}`,
        method: "POST",
      }),
    }),
    deleteSession: builder.mutation<void, string>({
      query: (sessionId) => ({
        url: `sessions/${sessionId}`,
        method: "DELETE",
      }),
    }),
    startQuiz: builder.mutation<void, string>({
      query: (quizSessionId) => ({
        url: `sessions/${quizSessionId}/start`,
        method: "POST",
      }),
    }),
    submitAnswer: builder.mutation<
      void,
      { sessionId: string; questionId: string; answerId: string }
    >({
      query: ({ sessionId, questionId, answerId }) => ({
        url: `sessions/${sessionId}/submit-answer`,
        method: "POST",
        body: { questionId, answerId },
      }),
    }),
    endQuiz: builder.mutation<
      void,
      { quizSessionId: string; feedback: string }
    >({
      query: ({ quizSessionId, feedback }) => ({
        url: `sessions/${quizSessionId}/end`,
        method: "POST",
        body: { feedback },
      }),
    }),

    sessionStatistics: builder.query<SessionStatistics, string>({
      query: (sessionId) => ({
        url: `statistics/session/${sessionId}`,
      }),
    }),
  }),
});

export const {
  useCreateSessionMutation,
  useSendSessionToEmailMutation,
  useSubmitAnswerMutation,
  useStartQuizMutation,
  useEndQuizMutation,
  useGetSessionQuery,
  useDeleteSessionMutation,
  useSessionStatisticsQuery,
} = sessionApi;
