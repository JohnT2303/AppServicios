import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../context/AuthContext";
import AuthStack from "./AuthStack";
import PrivateStack from "./PrivateStack";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <PrivateStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
