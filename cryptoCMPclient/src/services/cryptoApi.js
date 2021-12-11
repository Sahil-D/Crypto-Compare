import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const X_RAPIDAPI_KEY = process.env.REACT_APP_X_RAPIDAPI_KEY;

const cryptoApiHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': X_RAPIDAPI_KEY,
};

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

const baseURI = 'https://coinranking1.p.rapidapi.com';

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;
