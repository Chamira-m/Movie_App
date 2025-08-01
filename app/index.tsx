"use client";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check if user is logged in (you can use AsyncStorage, SecureStore, or your auth provider)
      const userToken = await AsyncStorage.getItem("userToken");

      if (userToken) {
        // User is logged in, navigate to tabs
        router.replace("/(tabs)");
      } else {
        // User is not logged in, navigate to login
        router.replace("/login");
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      router.replace("/login");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return null;
}
