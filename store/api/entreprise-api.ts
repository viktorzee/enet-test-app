import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { entrepriseListType, geolocationListType } from "../../src/model";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "../store/store";

const BASE_URL = process.env.EXPO_PUBLIC_LINGERE_URL;

interface GeoLocationParams {
  userId: number;
  entrepriseId: number;
}

export const entrepriseApi = createApi({
    reducerPath: "entrepriseApi",
    baseQuery: fetchBaseQuery({
      baseUrl: `${BASE_URL}`, 
      prepareHeaders: async (headers, { getState }) => {
        const token = (getState() as RootState)?.user?.token;
        console.log("token", token)
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
    }),
    tagTypes: ['Entreprise'],
    endpoints: (builder) => ({                
        getAllEntreprise: builder.query <entrepriseListType, void>({
            query: () => "/recrutement/react/entreprise",
            
            providesTags: (result) =>
              result && Array.isArray(result)
                ? [
                    ...result.map(({ id }) => ({ type: 'Entreprise' as const, id })),
                    { type: 'Entreprise', id: 'LIST' },
                  ]
                : [{ type: 'Entreprise', id: 'LIST' }],
        }),
        getGeoLocationData: builder.query<geolocationListType, GeoLocationParams>({
            query: ({userId, entrepriseId}) => `/recrutement/react/geolocalisation/editeur/${userId}/entreprise/${entrepriseId}`,            
        }),        
    })
})

export const {
    useGetAllEntrepriseQuery,
    useGetGeoLocationDataQuery,
} = entrepriseApi