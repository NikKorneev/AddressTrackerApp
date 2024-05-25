import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import slice from "./slice";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		slice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector =
	useSelector.withTypes<ReturnType<typeof store.getState>>();
