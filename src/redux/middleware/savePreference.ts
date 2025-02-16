import { MMKVLoader } from "react-native-mmkv-storage";
import { ThemeState } from "../features/preference/preferenceSlice";
import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

const storage = new MMKVLoader().initialize();

const savePreferenceToMMKV: Middleware = (storeAPI) => (next) => (action) => {
  const result = next(action);
  const state = storeAPI.getState() as RootState;
  try {
    storage.setString("preference", JSON.stringify(state.preference));
  } catch (error) {
    console.error("Failed to save preferences to MMKV", error);
  }
  return result;
};

const loadPreferencesFromMMKV = () => {
  try {
    const storedPreferences = storage.getString("preference");
    return storedPreferences ? JSON.parse(storedPreferences) : { theme: "system" };
  } catch (error) {
    console.error("Failed to load preferences from MMKV", error);
    return { theme: "system" };
  }
};

export { savePreferenceToMMKV, loadPreferencesFromMMKV };
