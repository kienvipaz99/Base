import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from './axiosClient';
import {API} from './BASE_URL/API';
import {ListApiResponse} from '../type/Common';
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
    login: build.mutation<Token, Login>({
      query(data) {
        return {
          url: 'api/v1/auth/login',
          method: 'POST',
          data,
        };
      },
    }),
    verifyToken: build.mutation<VeryTokenData, VeryToken>({
      query(data) {
        return {
          url: 'api/v1/auth/verify-token',
          method: 'POST',
          data,
        };
      },
    }),
    creatBank: build.mutation<Bank, Bank>({
      query(data) {
        return {
          url: 'api/v1/banks',
          method: 'POST',
          data,
        };
      },
    }),
    getDataKey: build.query<
      ListApiResponse<TypeDataListKey>,
      {per_page: number}
    >({
      query: ({per_page}) => ({
        url: `api/v1/plansubscriptions?include=plan,product,subscriber,invoices,invoices.user,invoices.bank,invoices.files&per_page=${per_page}`,
        method: 'GET',
      }),
      providesTags(result) {
        if (result?.data) {
          const data = result.data;
          return [
            ...data.map(({id}) => ({
              type: tagTypes,
              id,
            })),
            {
              type: tagTypes,
              id: 'LIST',
            },
          ];
        }
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    getBank: build.query<ListApiResponse<Bank>, string>({
      query: () => ({
        url: `api/v1/banks`,
        method: 'GET',
      }),
      providesTags(result) {
        if (result?.data) {
          const data = result.data;
          return [
            ...data.map(({id}) => ({
              type: tagTypes,
              id,
            })),
            {
              type: tagTypes,
              id: 'LIST',
            },
          ];
        }
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    getBanking: build.query<ListApiResponse<Banking>, string>({
      query: () => ({
        url: `api/v1/banks/list-bank`,
        method: 'GET',
      }),
      providesTags(result) {
        if (result?.data) {
          const data = result.data;
          return [
            ...data.map(({id}) => ({
              type: tagTypes,
              id,
            })),
            {
              type: tagTypes,
              id: 'LIST',
            },
          ];
        }
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    getProduct: build.query<ListApiResponse<Product>, string>({
      query: () => ({
        url: `api/v1/products`,
        method: 'GET',
      }),
      providesTags(result) {
        if (result?.data) {
          const data = result.data;
          return [
            ...data.map(({id}) => ({
              type: tagTypes,
              id,
            })),
            {
              type: tagTypes,
              id: 'LIST',
            },
          ];
        }
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    getPlans: build.query<ListApiResponse<Plans>, string>({
      query: () => ({
        url: `api/v1/plans`,
        method: 'GET',
      }),
      providesTags(result) {
        if (result?.data) {
          const data = result.data;
          return [
            ...data.map(({id}) => ({
              type: tagTypes,
              id,
            })),
            {
              type: tagTypes,
              id: 'LIST',
            },
          ];
        }
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    getLogs: build.query<ListApiResponse<Logs>, {per_page: number}>({
      query: ({per_page}) => ({
        url: `api/v1/changelogs?per_page=${per_page}`,
        method: 'GET',
      }),
      providesTags(result) {
        if (result?.data) {
          const data = result.data;
          return [
            ...data.map(({id}) => ({
              type: tagTypes,
              id,
            })),
            {
              type: tagTypes,
              id: 'LIST',
            },
          ];
        }
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    getTeamRevenue: build.query<ListApiResponse<RevenueTeam>, string>({
      query: () => ({
        url: `api/v1/teams?append=revenue,revenue_approve,ranges&month=5&years=2023`,
        method: 'GET',
      }),
      providesTags(result) {
        if (result?.data) {
          const data = result.data;
          return [
            ...data.map(({id}) => ({
              type: tagTypes,
              id,
            })),
            {
              type: tagTypes,
              id: 'LIST',
            },
          ];
        }
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    getDashboardRevenue: build.query<DashboardRevenue, string>({
      query: () => ({
        url: `api/v1/invoices/getDashboardRevenue`,
        method: 'GET',
      }),
      providesTags(result) {
        // if (result?.data) {
        //   const data = result.data;
        //   return [
        //     ...data.map(({id}) => ({
        //       type: tagTypes,
        //       id,
        //     })),
        //     {
        //       type: tagTypes,
        //       id: 'LIST',
        //     },
        //   ];
        // }
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
  }),
});

export const {
  useLogoutMutation,
  useRefreshMutation,
  useLoginMutation,
  useVerifyTokenMutation,
  useGetDataKeyQuery,
  useGetBankQuery,
  useCreatBankMutation,
  useGetBankingQuery,
  useGetProductQuery,
  useGetPlansQuery,
  useGetLogsQuery,
  useGetTeamRevenueQuery,
  useGetDashboardRevenueQuery,
} = authApi;
