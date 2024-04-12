import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@src/services/api";

export const mailApi = createApi({
  reducerPath: "mailApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    sendCustomStyledEmail: builder.mutation<
      void,
      { email: string; subject: string; htmlContent: string }
    >({
      query: ({ email, subject, htmlContent }) => ({
        url: "mail/send-custom",
        method: "POST",
        body: { email, subject, htmlContent },
      }),
    }),
  }),
});

export const { useSendCustomStyledEmailMutation } = mailApi;
