import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const X_CRYPTOCOMPARE_KEY = process.env.REACT_APP_X_CRYPTOCOMPARE_KEY;

const cryptoApiHeaders = {
  authorization: `Apikey ${X_CRYPTOCOMPARE_KEY}`,
};

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

const baseURI = 'https://min-api.cryptocompare.com/data/';

export const cryptoAnalysisApi = createApi({
  reducerPath: 'cryptoAnalysisApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (builder) => ({
    getDetailedCoinData: builder.query({
      query: (stringList) =>
        createRequest(`/pricemultifull?fsyms=${stringList}&tsyms=USD`),
    }),
    getCoinMinutePrice: builder.query({
      query: (coinSymbol) =>
        createRequest(`/v2/histominute?fsym=${coinSymbol}&tsym=USD&limit=20`),
    }),
    getCoinHourPrice: builder.query({
      query: (coinSymbol) =>
        createRequest(`/v2/histohour?fsym=${coinSymbol}&tsym=USD&limit=20`),
    }),
    getCoinDayPrice: builder.query({
      query: (coinSymbol) =>
        createRequest(`/v2/histoday?fsym=${coinSymbol}&tsym=USD&limit=20`),
    }),
  }),
});

export const {
  useGetDetailedCoinDataQuery,
  useGetCoinMinutePriceQuery,
  useGetCoinHourPriceQuery,
  useGetCoinDayPriceQuery,
} = cryptoAnalysisApi;
