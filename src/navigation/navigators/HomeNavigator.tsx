import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import { Profile } from "../screens/Profile";
import { useThemeColor } from "../../hooks/useThemeColor";

const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
  const backgroundColor = useThemeColor({}, "background");
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, sceneStyle: { backgroundColor } }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
