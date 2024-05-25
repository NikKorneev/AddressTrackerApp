import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type LocationFetched = {
	ip: string;
	location: {
		country: string;
		region: string;
		city: string;
		lat: number;
		lng: number;
		timezone: string;
	};
	as: {
		name: string;
	};
};

export const api = createApi({
	reducerPath: "ipApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "",
	}),
	endpoints: (builder) => ({
		getLocation: builder.query<LocationFetched, string>({
			query: (name: string) =>
				`https://geo.ipify.org/api/v2/country,city?apiKey=at_qfYKJGM3aeTj8jfPtDwYxronCTEC8${name}`,
		}),
	}),
});

export const { useGetLocationQuery } = api;
