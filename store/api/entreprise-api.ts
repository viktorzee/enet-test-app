import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../src/config/axiosBaseQuery";
import { entrepriseListType, geolocationListType } from "../../src/model";

const BASE_URL = process.env.EXPO_PUBLIC_LINGERE_URL;

interface GeoLocationParams {
  userId: number;
  entrepriseId: number;
}

export const entrepriseApi = createApi({
    reducerPath: "entrepriseApi",
    baseQuery: axiosBaseQuery({baseUrl: `${BASE_URL}`}),
    tagTypes: ['Entreprise'],
    endpoints: (builder) => ({                
        getAllEntreprise: builder.query <entrepriseListType, void>({
            query: () => ({
              url: "/recrutement/react/entreprise",
              method: "GET",
            }),
            providesTags: ["Entreprise"],
        }),
        getGeoLocationData: builder.query<geolocationListType, GeoLocationParams>({
            query: ({userId, entrepriseId}) => ({
              url: `/recrutement/react/geolocalisation/editeur/${userId}/entreprise/${entrepriseId}`,
              method: "GET",
            }),
            providesTags: ["Entreprise"],
        }),        
    })
})

export const {
    useGetAllEntrepriseQuery,
    useGetGeoLocationDataQuery,
} = entrepriseApi