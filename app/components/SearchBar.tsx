import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
  placeholder?: string;
  placeholderTextColor?: string,
  onPress?: () => void;
  onChangeText?: (text: string) => void;
  value?: string;
  editable?: boolean;
  autoFocus?: boolean;
}

const SearchBar = ({
  placeholder,
  onPress,
  value,
  onChangeText,
  editable,
  autoFocus,
}: Props) => {
  return (
    <View testID="SearchBar:Container" className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        testID="SearchBar:SearchIcon"
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        testID="SearchBar:TextInput"
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-2 text-white"
        editable={editable}
        autoFocus={autoFocus}
      />
    </View>
  );
};

export default SearchBar;
