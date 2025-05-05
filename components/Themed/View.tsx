import { View as DefaultView } from "react-native";

import React from "react";
import { ThemeProps, useThemeColor } from "../useThemeColor";

export type ViewProps = ThemeProps & DefaultView["props"];

export default function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
