import React, { lazy, Suspense } from "react";
import { ActivityIndicator } from "react-native";

type IconProps = {
  name: string;
  size?: number;
  color?: string;
  family?: "Ionicons" | "FontAwesome" | "MaterialIcons" | "Feather";
};

const iconMap = {
  Ionicons: lazy(() => import("@expo/vector-icons/Ionicons")),
  FontAwesome: lazy(() => import("@expo/vector-icons/FontAwesome")),
  MaterialIcons: lazy(() => import("@expo/vector-icons/MaterialIcons")),
  Feather: lazy(() => import("@expo/vector-icons/Feather")),
};

const AppIcon = ({
  name,
  size = 24,
  color = "#0000ff",
  family = "Ionicons",
}: IconProps) => {
  const Icon = iconMap[family];

  return (
    <Suspense fallback={<ActivityIndicator size="small" color={color} />}>
      <Icon family={family} name={name} size={size} color={color} />
    </Suspense>
  );
};

export default AppIcon;
