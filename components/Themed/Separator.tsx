import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { useThemeColor } from "../useThemeColor";

export default function Separator() {
  const color = useThemeColor({}, "separator");

  return <View style={styles.separator} lightColor={color} darkColor={color} />;
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
