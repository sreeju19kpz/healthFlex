import { MMKVLoader } from "react-native-mmkv-storage";
import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
const storage = new MMKVLoader().initialize();

const saveTimersToMMKV: Middleware = (storeAPI) => (next) => (action) => {
  const result = next(action);
  const state = storeAPI.getState() as RootState;
  try {
    storage.setString("timers", JSON.stringify(state.timer));
  } catch (error) {
    console.error("Failed to save location to MMKV:", error);
  }
  return result;
};

const loadTimersFromMMKV = () => {
  try {
    const timers = storage.getString("timers");
    return timers ? JSON.parse(timers) : { timers: [], completedTimers: [] };
  } catch (error) {
    console.error("Failed to load location from MMKV", error);
    return { timers: [], completedTimers: [] };
  }
};

export { saveTimersToMMKV, loadTimersFromMMKV };
