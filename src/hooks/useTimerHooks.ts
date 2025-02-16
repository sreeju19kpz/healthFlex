import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

const useTimerHooks = () => {
  const timers = useSelector((state: RootState) => state.timer.timers);
  const completedTimers = useSelector((state: RootState) => state.timer.completedTimers);
  const getTimerById = (id: number) => {
    return timers.find((timer) => timer.id === id);
  };

  const getAllActiveTimers = () => {
    return timers.filter((timer) => timer.running === true);
  };

  const getAllCompletedTimers = () => {
    return completedTimers;
  };

  const getAllTimersByCategory = (id: number) => {
    return timers.filter((timer) => timer.categoryId === id);
  };

  return { getTimerById, getAllActiveTimers, getAllCompletedTimers, getAllTimersByCategory };
};
export { useTimerHooks };
