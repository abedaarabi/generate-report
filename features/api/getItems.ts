import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootObject } from "../../components/Items";

export const items = createApi({
  reducerPath: "items",
  baseQuery: fetchBaseQuery({ baseUrl: "http://10.25.38.36:9090/" }),
  endpoints: (builder) => ({
    getItem: builder.query<RootObject[], string>({
      query: (itemId) => `projects/${itemId}`,
    }),
    getItemContent: builder.query<any, string>({
      query: (itemContentId) => `projects/${itemContentId}`,
    }),
  }),
});

export const itemContent = createApi({
  reducerPath: "itemsContent",
  baseQuery: fetchBaseQuery({ baseUrl: "api" }),
  tagTypes: ["itemsContent"],
  endpoints: (builder) => ({
    itemContent: builder.query<any | null, string>({
      query: (itemId) => `/${itemId}`,
      providesTags: ["itemsContent"],
    }),
  }),
});

export const { useGetItemQuery } = items;
export const { useItemContentQuery } = itemContent;
