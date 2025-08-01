import { images } from "@/constants/images";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  // Replace with actual user data (from context or Appwrite later)
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://i.pravatar.cc/150?img=3", // Placeholder avatar
  };

  return (
    <View className="flex-1 bg-primary px-5">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <View className="items-center mt-24">
        <Image
          source={{ uri: user.avatar }}
          className="w-24 h-24 rounded-full border-4 border-accent"
        />
        <Text className="text-white text-2xl font-bold mt-4">{user.name}</Text>
        <Text className="text-gray-400 text-sm">{user.email}</Text>
      </View>

      <View className="mt-10 space-y-4">
        <TouchableOpacity className="bg-dark-200 rounded-lg px-5 py-4">
          <Text className="text-white text-lg">Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-dark-200 rounded-lg px-5 py-4">
          <Text className="text-white text-lg">Saved Movies</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-red-500 rounded-lg px-5 py-4">
          <Text className="text-white text-lg">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
