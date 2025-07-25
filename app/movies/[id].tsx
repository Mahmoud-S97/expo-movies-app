import React, { useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { icons } from "@/constants/icons";
import { saveMovie as saveVisitedMovieAsFavorite } from "@/services/appwrite";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 text-sm font-bold mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const {
    data: movie,
    loading,
    error,
  } = useFetch(() => fetchMovieDetails(id as string));

  useEffect(() => {
    if (movie) {
      saveVisitedMovieAsFavorite(movie);
    }
  }, [movie]);

  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View className="mt-[350]">
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : error ? (
          <Text className="text-red-500 px-5 my-[350] text-center">
            Error: {error?.message || "Failed to load movie details"}
          </Text>
        ) : (
          <>
            <View>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
                }}
                className="w-full h-[550]"
                resizeMode="stretch"
              />
            </View>
            <View className="flex-col items-start justify-center mt-5 px-5">
              <Text className="text-white text-xl font-bold">
                {movie?.title}
              </Text>
              <View className="flex-row items-center gap-x-1 mt-2">
                <Text className="text-light-200 text-sm">
                  {movie?.release_date.split("-")[0]}
                </Text>
                <Text className="text-light-200 text-sm">
                  {movie?.runtime}m
                </Text>
              </View>
              <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
                <Image source={icons.star} className="size-4" />
                <Text className="text-white text-sm font-bold">
                  {Math.round(movie?.vote_average ?? 0)}/10
                </Text>
                <Text className="text-light-200 text-sm">
                  ({movie?.vote_count} votes)
                </Text>
              </View>
              <MovieInfo label="Overview" value={movie?.overview} />
              <MovieInfo
                label="Generes"
                value={movie?.genres.map((g) => g.name).join(" - ") || "N/A"}
              />
              <MovieInfo
                label="Countries"
                value={
                  movie?.production_countries
                    .map((prodCountry) => prodCountry.name)
                    .join(" - ") || "N/A"
                }
              />
              <View className="flex flex-row justify-between items-center w-2/3">
                <MovieInfo
                  label="Budget"
                  value={`$${((movie?.budget || 0) / 1_000_000).toFixed(2)} million`}
                />
                <MovieInfo
                  label="Revenue"
                  value={`$${(Math.round(movie?.revenue || 0) / 1_000_000).toFixed(2)} million`}
                />
              </View>
              <MovieInfo
                label="Production Companies"
                value={
                  movie?.production_companies
                    .map((prodCompany) => prodCompany.name)
                    .join(" - ") || "N/A"
                }
              />
            </View>
          </>
        )}
      </ScrollView>
      <TouchableOpacity
        onPress={router.back}
        className="py-3.5 absolute flex-row justify-center items-center rounded-lg bottom-5 left-0 right-0 mx-10 z-50 bg-accent"
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#FFFFFF"
        />
        <Text className="text-white text-base font-semibold">Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
