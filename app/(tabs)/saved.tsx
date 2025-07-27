import React from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import useFetch from "@/services/useFetch";
import SavedMovieCard from "../components/SavedMovieCard";
import { deleteAllSavedMovies, getSavedMovies } from "@/services/appwrite";

const Index = () => {
  const {
    data: savedFavoriteMovies,
    loading: savedMoviesLoading,
    error: savedMoviesError,
    refetch,
  } = useFetch(getSavedMovies);

  const confirmDeleteAllSavedMovies = () => {
    Alert.alert("Are you sure?", "Would you like to delete all saved movies?", [
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => null,
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          await deleteAllSavedMovies();
          refetch();
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        refreshControl={
          <RefreshControl
            tintColor="#0000ff"
            refreshing={savedMoviesLoading}
            onRefresh={refetch}
          />
        }
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {savedMoviesLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : savedMoviesError ? (
          <Text className="text-red-500 px-5 my-3">
            Error: {savedMoviesError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            {savedFavoriteMovies?.length ? (
              <View className="flex-row justify-between items-center">
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  Saved Movies
                </Text>
                <TouchableOpacity
                  activeOpacity={0.5}
                  className="flex-row justify-center items-center p-2"
                  onPress={confirmDeleteAllSavedMovies}
                >
                  <Text className="text-red-500 text-normal">Delete All</Text>
                </TouchableOpacity>
              </View>
            ) : null}
            <FlatList
              data={savedFavoriteMovies}
              renderItem={({ item }) => <SavedMovieCard {...item} />}
              keyExtractor={(item) => item.movie_id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
              ListEmptyComponent={
                !savedMoviesLoading && !savedMoviesError ? (
                  <View className="mt-[250`] px-5">
                    <Text className="text-center text-gray-500">
                      No saved movies yet.
                    </Text>
                  </View>
                ) : null
              }
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Index;
