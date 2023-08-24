import type {BaseQueryFn} from '@reduxjs/toolkit/query';
import axios, {AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import type {AxiosRequestConfig, AxiosError} from 'axios';
import {Alert} from 'react-native';
import {navigate} from '../../../RootNavigation';
import {API} from './BASE_URL/API';
export const axiosAuth = (auths: string) => {
  axios.interceptors.request.use(
    function (config: InternalAxiosRequestConfig) {
      config.headers.Accept = 'application/json';
      config.headers.Authorization = `Bearer ${auths}`;
      config.headers['Content-Type'] = 'multipart/form-data';
      return config;
    },
    function (error: AxiosError) {
      return Promise.reject(error);
    },
  );
};
axios.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response.status === 401) {
      Alert.alert(
        'Bạn đã hết hạn đăng nhập, vui lòng đăng nhập lại để tiếp tục',
        ' ',
        [{text: 'Đồng ý', onPress: () => navigate('Login')}],
      );
    }
    // Do something with response error
    return Promise.reject(error);
  },
);
export const axiosBaseQuery =
  (
    {baseUrl}: {baseUrl: string} = {baseUrl: API},
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      timeout?: AxiosRequestConfig['timeout'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async ({url, method, data, params, timeout, headers}) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        timeout,
        headers,
      });

      return {data: result.data};
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
