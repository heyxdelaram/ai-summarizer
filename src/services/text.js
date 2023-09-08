//a specific state in the global state(store)

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rapidApiKey = import.meta.env.VITE_RAPID_API_KEY;

export const textApi = createApi({
  reducerPath: "textApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", rapidApiKey);
      headers.set(
        "X-RapidAPI-Host'",
        "article-extractor-and-summarizer.p.rapidapi.com"
      );

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      //passing a user generated content into the url, we should always surround it with encodeURIComponent
      query: (params) =>
        `/summarize?url=${encodeURIComponent(params.textUrl)}&length=3`,
    }),
  }),
});

export const { useLazyGetSummaryQuery } = textApi;
