import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  tags: string[];
}

type RelatedProduct = {
  message: string;
  recommendations: Product[];
}


type ProductResponse = {
  count: number;
  results: Product[];
}
const baseUrl = "http://127.0.0.1:8000/api/v1";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse, { category: string }>({
      query: ({ category }) => {
        return {
          url: "/products/",
          params: {
            category,
          },
        };
      },
    }),

    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),

    getRelatedProducts: builder.mutation<
      RelatedProduct,
      { viewed_products: number[] }
    >({
      query: (viewed_products) => ({
        url: "/recommendations/",
        method: "POST",
        body: viewed_products,
      }),
    }),
  }),
});
export const { useGetProductsQuery,useGetProductByIdQuery,useGetRelatedProductsMutation } = productApi;
