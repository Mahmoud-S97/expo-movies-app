import React from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import useFetch from "@/services/useFetch";
import { getAccountDetails } from "@/services/api";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

type PersonalInfoProps = {
  label: string;
  value?: string;
};

const PersonalInfo = ({ label, value }: PersonalInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 text-sm font-bold mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const Profile = () => {
  const {
    data: profileDetails,
    loading: profileLoading,
    error: profileErrors,
    refetch,
  } = useFetch(getAccountDetails);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        refreshControl={
          <RefreshControl
            onRefresh={refetch}
            refreshing={profileLoading}
            tintColor="#0000ff"
          />
        }
      >
        <View className="w-full flex-row justify-center items-center my-20">
          <Image source={icons.logo} className="w-12 h-10" />
        </View>
        {profileLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : profileErrors ? (
          <Text className="text-red-500 px-5 text-center mt-[250]">
            Error: {profileErrors?.message}
          </Text>
        ) : (
          <View className="flex-1 items-start">
            <View className="flex-row justify-start items-center">
              <View className="flex-row justify-center items-center">
                <Image
                  source={
                    profileDetails?.avatar?.tmdb?.avatar_path
                      ? {
                          uri: `https://image.tmdb.org/t/p/w300${profileDetails?.avatar?.tmdb?.avatar_path}`,
                        }
                      : icons.logo
                  }
                  resizeMode="cover"
                  className="w-20 h-20 rounded-full"
                />
              </View>
              <View className="flex-column ml-5">
                <Text className="font-bold text-xl text-light-100 mt-1 capitalize">
                  {profileDetails?.name}
                </Text>
                <Text className="font-bold text-sm text-light-200 lower">
                  {profileDetails?.username}
                </Text>
              </View>
            </View>
            <View className="flex-1 mt-5">
              <PersonalInfo
                label="Country Code"
                value={profileDetails?.iso_3166_1}
              />
              <PersonalInfo
                label="Language"
                value={profileDetails?.iso_639_1}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Profile;
