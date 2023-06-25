// Redux toolkit to simplify boilerplate 
// RTK query lets us make api calls in a simple way and store it in redux store
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({ 
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL}),
    reducerPath: "index", // name of slice
    tagTypes: [],
    endpoints: (build) => ({
        // query call we'll use to make api request to backend routes
        // function that calls API
        postAiText: build.mutation({
            query: (payload) => ({
                url: "openai/text", // baseURL prefixed here
                method: "POST",
                body: payload, // send body of payload to backend
            }),
        }),
        postAiCode: build.mutation({
            query: (payload) => ({
                url: "openai/code",
                method: "POST",
                body: payload, 
            }),
        }),
        postAiComplete: build.mutation({
            query: (payload) => ({
                url: "openai/autoComplete", 
                method: "POST",
                body: payload,
            }),
        }),
    }),
});

export const {
    usePostAiTextMutation,
    usePostAiCodeMutation,
    usePostAiCompleteMutation
} = api;