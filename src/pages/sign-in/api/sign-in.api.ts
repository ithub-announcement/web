import { __APP_CONFIG__ } from "@/app/config.env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuhtorzationClientPayload, AuhtorzationClientResponse } from "./types";

export const SignInAPI = createApi({
  reducerPath: "login/api",
  baseQuery: fetchBaseQuery({
    baseUrl: __APP_CONFIG__.api.baseUrl + "/users/api/v1",
  }),
  endpoints: (build) => ({
    AuhtorzationClient: build.mutation<
      AuhtorzationClientResponse,
      AuhtorzationClientPayload
    >({
      query: (payload: AuhtorzationClientPayload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data, meta } = await queryFulfilled;
          if (meta?.response?.status == 200) {
            localStorage.setItem("access", data.access);
            window.location.href = "/";
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useAuhtorzationClientMutation } = SignInAPI;
