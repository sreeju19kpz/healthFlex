import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { showNotification } from "../../../lib/notificationHandler";

export interface Timer {
  id: number;
  duration: number;
  remaining: number;
  running: boolean;
  categoryId: number;
  name: string;
  startedAt?: string;
}
export type CompletedTimerProps = Timer & { completedOn: string };

type TimerState = {
  timers: Timer[];
  completedTimers: CompletedTimerProps[];
};

const initialState: TimerState = {
  timers: [],
  completedTimers: [],
};

const addTimer = (
  state: TimerState,
  action: PayloadAction<{ duration: number; categoryId: number; name: string }>
) => {
  const { duration, categoryId, name } = action.payload;
  state.timers.push({
    id: state.timers.length + 1,
    duration,
    remaining: duration,
    running: false,
    categoryId,
    name,
  });
};

const triggerTimer = (state: TimerState, action: PayloadAction<number>) => {
  const timer = state.timers.find((t) => t.id === action.payload);
  if (timer) {
    const currentState = timer.running;
    if (currentState === false) {
      timer.startedAt = new Date().toISOString();
    }
    timer.running = !currentState;
  }
};

const resetTimer = (state: TimerState, action: PayloadAction<number>) => {
  const timer = state.timers.find((t) => t.id === action.payload);
  if (timer) {
    timer.running = false;
    timer.remaining = timer.duration;
  }
};

const decrementTime = (state: TimerState) => {
  state.timers.forEach((timer) => {
    if (timer.running && timer.remaining === 0) {
      timer.running = false;
      showNotification(timer.name, "success", "full");
      state.completedTimers.push({ ...timer, completedOn: new Date().toISOString() });
    }
    if (timer.running && timer.remaining > 0) {
      timer.remaining -= 1;
      if (timer.duration / 2 === timer.remaining) {
        showNotification(timer.name, "We have completed 50% of the progress.", "half");
      }
    }
  });
};

const updateTimeFromBackground = (state: TimerState) => {
  state.timers.forEach((timer) => {
    if (timer.running && timer.startedAt) {
      const elapsedSeconds = Math.floor((Date.now() - new Date(timer.startedAt).getTime()) / 1000);
      timer.remaining = Math.max(timer.duration - elapsedSeconds, 0);
      if (timer.remaining === 0) {
        timer.running = false;
        state.completedTimers.push({ ...timer, completedOn: new Date().toISOString() });
      }
    }
  });
};

const startTimerByCategoryId = (state: TimerState, action: PayloadAction<number>) => {
  const timers = state.timers.filter((t) => t.categoryId === action.payload);

  timers.forEach((timer) => {
    if (timer.running === false) {
      timer.startedAt = new Date().toISOString();
      timer.running = true;
    }
  });
};

const stopTimerByCategoryId = (state: TimerState, action: PayloadAction<number>) => {
  const timers = state.timers.filter((t) => t.categoryId === action.payload);

  timers.forEach((timer) => {
    if (timer.running === true) {
      timer.running = false;
    }
  });
};

const resetTimerByCategoryId = (state: TimerState, action: PayloadAction<number>) => {
  const timers = state.timers.filter((t) => t.categoryId === action.payload);
  timers.forEach((timer) => {
    timer.running = false;
    timer.remaining = timer.duration;
  });
};

const timerSlice = createSlice({
  name: "timers",
  initialState,
  reducers: {
    addTimer,
    triggerTimer,
    resetTimer,
    decrementTime,
    updateTimeFromBackground,
    startTimerByCategoryId,
    stopTimerByCategoryId,
    resetTimerByCategoryId,
  },
});

export { timerSlice };
