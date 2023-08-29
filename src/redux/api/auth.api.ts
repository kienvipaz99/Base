import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from './axiosClient';
import {API} from './BASE_URL/API';
import {ListApiResponse} from '../type/Common';
import {AxiosHeaders} from 'axios';
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
      {per_page: number; params: string}
    >({
      query: ({per_page, params}) => ({
        url: `api/v1/plansubscriptions?include=plan,product,subscriber,invoices,invoices.user,invoices.bank,invoices.files&filter[active]=1&per_page=${per_page}${params}`,
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
        url: `api/v1/banks?per_page=1000`,
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
        url: `api/v1/products?append=revenue,revenue_approve,ranges&month=5&years=2023&per_page=1000`,
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
    getProducts: build.query<ListApiResponse<Product>, {perPage: number}>({
      query: ({perPage}) => ({
        url: `api/v1/products?per_page=${perPage}`,
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
    creatProduct: build.mutation<ListApiResponse<CreatProduct>, CreatProduct>({
      query(data) {
        return {
          url: 'api/v1/products',
          method: 'POST',
          data,
        };
      },
    }),
    editProduct: build.mutation<EditProduct, EditProduct>({
      query({id, data}) {
        return {
          url: `api/v1/products/${id}`,
          method: 'PATCH',
          data,
        };
      },
      invalidatesTags: result => [{type: tagTypes, id: 'LIST'}],
    }),
    deleteProduct: build.mutation<{}, {id?: number}>({
      query({id}) {
        return {
          url: `api/v1/products/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: result => [{type: tagTypes}],
    }),
    getPlans: build.query<ListApiResponse<Plans>, {option: string}>({
      query: ({option}) => ({
        url: `api/v1/plans${option}`,
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
    creatPlans: build.mutation<Plans, CreatPlans>({
      query(data) {
        return {
          url: 'api/v1/plans',
          method: 'POST',
          data,
        };
      },
    }),
    changePlans: build.mutation<Plans, ChangePlans>({
      query({id, data}) {
        return {
          url: `api/v1/plans/${id}`,
          method: 'PATCH',
          data,
        };
      },
      invalidatesTags: result => [{type: tagTypes, id: 'LIST'}],
    }),
    deletePlans: build.mutation<{}, {id?: number}>({
      query({id}) {
        return {
          url: `api/v1/plans/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: result => [{type: tagTypes}],
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

    creatLog: build.mutation<Logs, CreatLog>({
      query(data) {
        return {
          url: 'api/v1/changelogs',
          method: 'POST',
          data,
        };
      },
    }),

    getTeamRevenue: build.query<ListApiResponse<RevenueTeam>, {option: string}>(
      {
        query: ({option}) => ({
          url: `api/v1/teams${option}`,
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
      },
    ),
    getDashboardRevenue: build.query<DashboardRevenue, string>({
      query: () => ({
        url: `api/v1/invoices/getDashboardRevenue`,
        method: 'GET',
      }),
      providesTags(result) {
        return [{type: tagTypes, id: 'LIST'}];
      },
    }),
    getActivities: build.query<
      ListApiResponse<Activities>,
      {per_page: number; params?: string}
    >({
      query: ({per_page, params}) => ({
        url: `api/v1/activities?include=subject,causer&per_page=${per_page}${params}`,
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
    getDashboardChart: build.query<dasBoadChart, {month: string; year: string}>(
      {
        query: ({month, year}) => ({
          url: `api/v1/invoices/getDashboardChart?month=${month}&year=${year}`,
          method: 'GET',
        }),
        providesTags(result) {
          return [{type: tagTypes, id: 'LIST'}];
        },
      },
    ),
    creatUser: build.mutation<User, CreateUser>({
      query(data) {
        return {
          url: 'api/v1/users',
          method: 'POST',
          data,
        };
      },
    }),
    getTypeUser: build.query<ListApiResponse<TypeUser>, string>({
      query: () => ({
        url: `api/v1/users/types`,
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
    getUser: build.query<ListApiResponse<GetUser>, {option: string}>({
      query: option => ({
        url: `api/v1/users?per_page=-1&${option}`,
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
    getEmployee: build.query<ListApiResponse<GetUser>, {per_page: number}>({
      query: ({per_page}) => ({
        url: `api/v1/users?per_page=${per_page}&filter[member]=MEMBER&include=roles,team&append=revenue_last_month,revenue_approve,revenue`,
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
    creatInvoices: build.mutation<Invoices, CreateInvoices>({
      query(data) {
        return {
          url: 'api/v1/invoices',
          method: 'POST',
          data,
        };
      },
    }),

    changeInvoid: build.mutation<{}, ChangeInVoid>({
      query({id, data}) {
        return {
          url: `api/v1/invoices/${id}`,
          method: 'POST',
          data,
          headers: {
            'Content-Type': 'multipart/form-data', // Đúng cú pháp của header
          },
        };
      },
    }),
    deleteInvoid: build.mutation<{}, {id: number | undefined}>({
      query({id}) {
        return {
          url: `api/v1/invoices/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: result => [{type: tagTypes}],
    }),
    deleteUser: build.mutation<{}, {id: number | undefined}>({
      query({id}) {
        return {
          url: `api/v1/users/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: result => [{type: tagTypes}],
    }),
    changeUser: build.mutation<ChangeUser, ChangeUser>({
      query({id, data}) {
        return {
          url: `api/v1/users/${id}`,
          method: 'PATCH',
          data,
        };
      },
      invalidatesTags: result => [{type: tagTypes, id: 'LIST'}],
    }),
    getBranches: build.query<ListApiResponse<Branches>, {option: string}>({
      query: ({option}) => ({
        url: `api/v1/branches${option}`,
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
    getRoles: build.query<ListApiResponse<Roles>, string>({
      query: () => ({
        url: `api/v1/roles`,
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
    creatBranches: build.mutation<{}, {name: string; slug: string}>({
      query(data) {
        return {
          url: 'api/v1/branches',
          method: 'POST',
          data,
        };
      },
    }),
    creatTeam: build.mutation<Team, CreatTeam>({
      query(data) {
        return {
          url: `api/v1/teams`,
          method: 'POST',
          data,
        };
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
  useDeleteProductMutation,
  useGetPlansQuery,
  useChangePlansMutation,
  useDeletePlansMutation,
  useCreatPlansMutation,
  useGetLogsQuery,
  useGetTeamRevenueQuery,
  useGetDashboardRevenueQuery,
  useGetActivitiesQuery,
  useGetDashboardChartQuery,
  useCreatUserMutation,
  useGetTypeUserQuery,
  useGetUserQuery,
  useCreatInvoicesMutation,
  useChangeInvoidMutation,
  useDeleteInvoidMutation,
  useChangeUserMutation,
  useGetEmployeeQuery,
  useGetBranchesQuery,
  useGetRolesQuery,
  useDeleteUserMutation,
  useCreatBranchesMutation,
  useCreatTeamMutation,
  useCreatProductMutation,
  useEditProductMutation,
  useCreatLogMutation,
  useGetProductsQuery,
} = authApi;
