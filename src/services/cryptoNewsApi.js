import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'
const CryptoNewsApiHeaders =   {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
    'X-RapidAPI-Key': '840d4c0ba2msh84659f4772bf8b6p101e60jsnd2d94af33b08',
  }
const createRequest =  (url)=>({url,headers : CryptoNewsApiHeaders});

export  const cryptoNewsApi = createApi({
    reducerPath : 'cryptoNewsApi',
    baseQuery : fetchBaseQuery({baseUrl}),
    endpoints : (builder)=>({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        })
    })
})
console.log(cryptoNewsApi);
export const {useGetCryptoNewsQuery} = cryptoNewsApi;