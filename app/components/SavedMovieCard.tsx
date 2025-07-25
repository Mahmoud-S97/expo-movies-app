import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";

// movie_id={item.movie_id}
// poster_url={item.poster_url}
// title={item.title}
// vote_average={item.vote_average}
// release_date={item.release_date}

const MovieCard = ({
  movie_id,
  poster_url,
  title,
  vote_average,
  release_date,
}: SavedMovieCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity
        activeOpacity={0.7}
        className="w-[30%]"
        onPress={() => {}}
      >
        <Image
          source={{
            uri: poster_url ?? "https://placehold.co/600x400/1a1a1a/ffffff.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-white text-sm font-bold mt-2" numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs text-white font-bold uppercase">
            {Math.round(vote_average / 2)}
          </Text>
        </View>
        <View className="flex-row items-center items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {release_date?.split("-")[0]}
          </Text>
          <Text className="text-xs text-light-300 font-medium uppercase">
            Movie
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
