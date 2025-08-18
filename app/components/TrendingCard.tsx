import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import { images } from "@/constants/images";

const TrendingCard = ({
  movie: { movie_id, title, poster_url },
  index,
}: TrendingCardProps) => {
  return (
    <Link testID="TrendingMovieCard:Link" href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity
        testID="TrendingMovieCard:Navigation:Button"
        activeOpacity={0.7}
        className="w-32 relative pl-5"
      >
        <Image
          testID="TrendingMovieCard:PosterImage"
          source={{ uri: poster_url }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />
        <View
          testID="TrendingMovieCard:MaskedViewBox"
          className="absolute bottom-4 -left-1 px-2 py-1 rounded-full"
        >
          <MaskedView
            testID="TrendingMovieCard:MaskedViewComponent"
            maskElement={
              <Text
                testID="TrendingMovieCard:MaskedViewText"
                className="font-bold text-white text-6xl"
              >
                {index + 1}
              </Text>
            }
          >
            <Image
              testID="TrendingMovieCard:RankingImage"
              source={images.rankingGradient}
              className="size-20"
              resizeMode="cover"
            />
          </MaskedView>
        </View>
        <Text
          testID="TrendingMovieCard:Title"
          className="font-bold text-light-200 text-sm mt-2"
          numberOfLines={2}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
