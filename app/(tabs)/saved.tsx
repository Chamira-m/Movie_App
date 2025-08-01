import MovieCard from "@/components/movieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";

export default function Saved() {
  const [savedMovies, setSavedMovies] = useState<any[]>([]);

  // Example dummy data – replace later with Appwrite fetch
  useEffect(() => {
    setSavedMovies([
      {
        id: 101,
        title: "Interstellar",
        poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      },
      {
        id: 102,
        title: "Inception",
        poster_path: "/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
      },
    ]);
  }, []);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />
      <View className="flex-row justify-center mt-20">
        <Image source={icons.logo} className="w-12 h-10" />
      </View>
      <Text className="text-white text-xl font-bold text-center mt-5">
        Saved Movies
      </Text>

      {savedMovies.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-400 text-lg">No saved movies yet</Text>
        </View>
      ) : (
        <FlatList
          data={savedMovies}
          renderItem={({ item }) => <MovieCard {...item} />}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "center",
            gap: 16,
            marginVertical: 16,
          }}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
}
