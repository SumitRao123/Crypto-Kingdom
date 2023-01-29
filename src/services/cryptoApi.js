import {createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseUrl = 'https://coinranking1.p.rapidapi.com';
const cryptoApiHeaders = {
	'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': '840d4c0ba2msh84659f4772bf8b6p101e60jsnd2d94af33b08'
}
const createRequest = (url) => ({url,headers: cryptoApiHeaders })
// console.log(createRequest('/exchanges'));
export  const cryptoApi = createApi({
	reducerPath : 'cryptoApi',
	baseQuery : fetchBaseQuery({baseUrl}),
	endpoints : (builder) => ({
		getCryptos : builder.query({
			query : (count) => createRequest(`/coins?limit=${count}`),
		}),
		getCryptoDetails : builder.query({
			query : (coinId) => createRequest(`/coin/${coinId}`),
		}),
	    getCryptoHistory: builder.query({
			query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
		}),
	})
} );
// console.log(cryptoApi);
export  const {useGetCryptosQuery,useGetCryptoDetailsQuery,useGetCryptoHistoryQuery } =  cryptoApi;