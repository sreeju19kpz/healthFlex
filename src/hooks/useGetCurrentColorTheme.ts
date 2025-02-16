import { useColorScheme } from "./useColorScheme";

const useGetCurrentColorScheme = () => {
  const theme = useColorScheme() === "dark" ? "dark" : "light";
  return { theme };
};

export { useGetCurrentColorScheme };
