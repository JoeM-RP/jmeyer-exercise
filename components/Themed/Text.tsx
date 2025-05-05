import { Text as DefaultText } from "react-native";

import React from "react";
import { ThemeProps, useThemeColor } from "../useThemeColor";

export type TextProps = ThemeProps & DefaultText["props"];

export default function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}
