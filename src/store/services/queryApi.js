import { api } from "config/apiHandler";

const queryApi = api.injectEndpoints({
  endpoints: (build) => ({
    postQuery: build.mutation({
      query: (requestBody) => ({
        url: `/query`,
        method: "POST",
        body: requestBody,
      }),
      transformResponse: (baseQueryReturnValue) => {
        if (baseQueryReturnValue.code !== "success") throw new Error(baseQueryReturnValue.message);
        else {
          return baseQueryReturnValue.data;
        }
      },
      transformErrorResponse: (baseQueryReturnValue) => baseQueryReturnValue,
    }),
  }),
  overrideExisting: false,
});

export const { usePostQueryMutation } = queryApi;
export default queryApi;
