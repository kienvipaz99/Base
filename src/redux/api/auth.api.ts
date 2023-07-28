import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from './axiosClient';
import {API} from './BASE_URL/API';
const tagTypes = 'Auth' as const;
export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: [tagTypes],
  baseQuery: axiosBaseQuery({baseUrl: API}),
  endpoints: build => ({
    logout: build.mutation<{}, {}>({
      query() {
        return {
          url: 'auth/logout',
          method: 'POST',
        };
      },
    }),
    refresh: build.mutation({
      query() {
        return {
          url: 'auth/refresh',
          method: 'POST',
        };
      },
    }),
  }),
});

export const {useLogoutMutation, useRefreshMutation} = authApi;
