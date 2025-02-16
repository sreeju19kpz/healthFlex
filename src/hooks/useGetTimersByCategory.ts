import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { categories } from "../utils/categories";
import { Timer } from "../redux/features/timer/timerSlice";

interface Section {
  title: string;
  data: Timer[];
}
const useGetTimersByCategory = () => {
  const timers = useSelector((state: RootState) => state.timer);

  const categoryMap: Record<number, string> = categories.reduce((acc, category) => {
    acc[category.id] = category.name;
    return acc;
  }, {} as Record<number, string>);

  const grouped = timers.timers?.reduce((acc, item) => {
    const categoryName = categoryMap[item.categoryId] || "Uncategorized";
    const existingSection = acc.find((section) => section.title === categoryName);

    if (existingSection) {
      existingSection.data.push(item);
    } else {
      acc.push({ title: categoryName, data: [item] });
    }

    return acc;
  }, [] as Section[]);

  return grouped;
};

export { useGetTimersByCategory };
