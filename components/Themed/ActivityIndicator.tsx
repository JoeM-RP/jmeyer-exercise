import { ActivityIndicator as DefaultActivityIndicator } from "react-native";

import React from "react";
import { ThemeProps, useThemeColor } from "../useThemeColor";

export type RefreshProps = ThemeProps & DefaultActivityIndicator["props"];

export default function ActivityIndicator(props: RefreshProps) {
  const { animating } = props;
  const color = useThemeColor({}, "loading");
  return (
    <DefaultActivityIndicator
      animating={animating}
      size={"large"}
      color={color}
    />
  );
}
