import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { value: string; isError: boolean } = {
	value: "",
	isError: false,
};

export const slice = createSlice({
	name: "search",
	initialState,
	reducers: {
		setValue: (state, { payload }: PayloadAction<string>) => {
			state.value = payload;
		},
		setError: (state, { payload }: PayloadAction<boolean>) => {
			state.isError = payload;
		},
	},
});

export const { setValue, setError } = slice.actions;

export default slice.reducer;
