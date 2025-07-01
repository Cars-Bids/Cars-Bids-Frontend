
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import apiConf from "../../conf/api_conf.json";
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: apiConf.baseUrl }),
   endpoints: () => ({})
});



