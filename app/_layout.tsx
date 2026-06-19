import { useColorScheme } from "@/hooks/use-color-scheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const verifyUser = async () => {
      const user = await AsyncStorage.getItem("user");
      const inAuth = segments[0] === "(auth)";
      if (!user && !inAuth) {
        router.replace("/(auth)/login");
      }
      if (user && inAuth) {
        router.replace("/(tabs)");
      }
    };
    verifyUser();
  }, [segments]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerTintColor: "#000000",
          headerTitleStyle: {
            color: "#000000",
          },
        }}
      >
        <Stack.Screen
          name="(auth)"
          options={{ headerShown: false, title: "AUTH" }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, title: "MENU" }}
        />
        <Stack.Screen
          name="details"
          options={{ headerShown: true, title: "Product Details" }}
        />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
