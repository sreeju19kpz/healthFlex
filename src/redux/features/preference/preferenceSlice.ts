import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ThemeTypes = "dark" | "light" | "system";
export type ThemeState = { theme: ThemeTypes };

const initialState: ThemeState = {
  theme: "system",
};

const setTheme = (state: ThemeState, action: PayloadAction<{ theme: ThemeState["theme"] }>) => {
  state.theme = action.payload.theme;
};

const preferenceSlice = createSlice({
  name: "preference",
  initialState,
  reducers: {
    setTheme,
  },
});

export { preferenceSlice };
