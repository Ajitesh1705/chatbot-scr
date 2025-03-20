import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getIdentity from "config/getIdentity";
import cookiesManipulator from "services/browserStorage/cookies";

export const API_URL = process.env.REACT_APP_API_URL;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers, { endpoint }) => {
      // headers.set("x-platform", 1);
      // headers.set("x-origin", 2);
      // headers.set("x-version", 1);
      headers.set("Content-Type", "application/json");
      const token = cookiesManipulator.getCookies("token");
      const identifier = await getIdentity();
      // headers.set("x-identifier", identifier);

      // headers.set("x-auth", token);
      // if (endpoint.includes("login") && !endpoint.includes("logout")) {
      //   headers.delete("x-auth");
      // }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default api;
