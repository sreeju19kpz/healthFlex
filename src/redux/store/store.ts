import { configureStore } from "@reduxjs/toolkit";
import { preferenceSlice } from "../features/preference/preferenceSlice";
import { loadPreferencesFromMMKV, savePreferenceToMMKV } from "../middleware/savePreference";
import { loadTimersFromMMKV, saveTimersToMMKV } from "../middleware/saveTimers";
import { timerSlice } from "../features/timer/timerSlice";

const store = configureStore({
  reducer: {
    preference: preferenceSlice.reducer,
    timer: timerSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(savePreferenceToMMKV, saveTimersToMMKV),
  devTools: true,
  preloadedState: {
    preference: loadPreferencesFromMMKV(),
    timer: loadTimersFromMMKV(),
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store };
