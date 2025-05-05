import {
  Text as DefaultText,
  View as DefaultView,
  Pressable as DefaultPressable,
  PressableProps as DefaultPressableProps,
  StyleSheet,
} from "react-native";
import { ThemeProps, useThemeColor } from "../useThemeColor";

export type ButtonProps = ThemeProps &
  DefaultText["props"] &
  DefaultPressableProps;

export default function Button(props: ButtonProps) {
  const { disabled, children, style, lightColor, darkColor, ...otherProps } =
    props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "buttonPrimary",
  );

  const color = useThemeColor({ light: darkColor, dark: lightColor }, "text");

  return (
    <DefaultPressable accessibilityRole="button" {...otherProps}>
      {({ pressed }) => (
        <DefaultView
          style={[
            { backgroundColor, opacity: pressed || disabled ? 0.5 : 1 },
            styles.button,
          ]}
        >
          <DefaultText style={[style, { textAlign: "center", color }]}>
            {children}
          </DefaultText>
        </DefaultView>
      )}
    </DefaultPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 4,
    minWidth: 100,
    maxWidth: 320,
    // flexShrink: 1,
    // flex: 1,
  },
});
