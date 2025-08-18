import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";

const SavedMovieCard = ({
  movie_id,
  poster_url,
  title,
  vote_average,
  release_date,
}: SavedMovieCardProps) => {
  return (
    <Link testID="SavedMovieCard:Link" href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity
        testID="SavedMovieCard:Navigation:Button"
        activeOpacity={0.7}
        className="w-[30%]"
        onPress={() => {}}
      >
        <Image
          testID="SavedMovieCard:PosterImage"
          source={{
            uri: poster_url ?? "https://placehold.co/600x400/1a1a1a/ffffff.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text testID="SavedMovieCard:Title" className="text-white text-sm font-bold mt-2" numberOfLines={1}>
          {title}
        </Text>
        <View testID="SavedMovieCard:VoteBox" className="flex-row items-center justify-start gap-x-1">
          <Image testID="SavedMovieCard:VoteStarImage" source={icons.star} className="size-4" />
          <Text testID="SavedMovieCard:VoteAverage" className="text-xs text-white font-bold uppercase">
            {Math.round(vote_average / 2)}
          </Text>
        </View>
        <View testID="SavedMovieCard:ReleaseBox" className="flex-row items-center items-center justify-between">
          <Text testID="SavedMovieCard:ReleaseDate" className="text-xs text-light-300 font-medium mt-1">
            {release_date?.split("-")[0]}
          </Text>
          <Text testID="SavedMovieCard:VideoType" className="text-xs text-light-300 font-medium uppercase">
            Movie
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default SavedMovieCard;
