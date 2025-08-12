import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link testID="MovieCard:Link" href={`/movies/${id}`} asChild>
      <TouchableOpacity
      testID="MovieCard:Navigation:Button"
        activeOpacity={0.7}
        className="w-[30%]"
        onPress={() => {}}
      >
        <Image
        testID="MovieCard:PosterImage"
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/ffffff.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text testID="MovieCard:Title" className="text-white text-sm font-bold mt-2" numberOfLines={1}>
          {title}
        </Text>
        <View testID="MovieCard:VoteBox" className="flex-row items-center justify-start gap-x-1">
          <Image testID="MovieCard:VoteStarImage" source={icons.star} className="size-4" />
          <Text testID="MovieCard:VoteAverage" className="text-xs text-white font-bold uppercase">
            {Math.round(vote_average / 2)}
          </Text>
        </View>
        <View testID="MovieCard:ReleaseBox" className="flex-row items-center items-center justify-between">
          <Text testID="MovieCard:ReleaseDate" className="text-xs text-light-300 font-medium mt-1">
            {release_date?.split("-")[0]}
          </Text>
          <Text testID="MovieCard:VideoType" className="text-xs text-light-300 font-medium uppercase">
            Movie
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
