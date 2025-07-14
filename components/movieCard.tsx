import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
const screenWidth = Dimensions.get("window").width;
const horizontalPadding = 20; // Total horizontal padding (e.g., px-5 = 20px)
const numColumns = 3;
const gap = 20;
const cardWidth =
  (screenWidth - horizontalPadding - gap * (numColumns - 1)) / numColumns;

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <View style={{ width: cardWidth }}>
      <Link href={`/movies/${id}`} asChild>
        <TouchableOpacity className="w-full">
          <Image
            source={{
              uri: poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : "https://placehold.co/600*400/1a1a1a/ffffff.png",
            }}
            className="w-full h-52 rounded-lg"
            resizeMode="cover"
          />
          <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
            {title}
          </Text>
          <View className="flex-row items-center justify-start gap-x-1">
            <Image source={icons.star} className="size-4" />
            <Text className="text-xs text-white font-bold uppercase">
              {Math.round(vote_average / 2)}
            </Text>
          </View>
          <View className="flex-row items-center justify-between  ">
            <Text className="text-xs font-medium text-light-300 uppercase">
              {release_date.split("-")[0]}
            </Text>
            <Text className="text-xs font-medium text-light-300 uppercase">
              Movie
            </Text>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default MovieCard;
