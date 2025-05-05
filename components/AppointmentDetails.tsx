import { StyleSheet } from "react-native";

import { View, Text } from "./Themed";
import { getFormattedDate, getFormattedTime } from "@/utils";

export interface AppointmentDetailsProps {
  date: string;
  time: string;
}

export function AppointmentDetails(props: AppointmentDetailsProps) {
  const { date, time } = props;
  const formattedDate = getFormattedDate(date);
  const formattedTime = getFormattedTime(time);
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <Text style={styles.title}>{formattedTime}</Text>
      <Text style={styles.text}>{formattedDate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "stretch",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 400,
  },
  text: {
    marginVertical: 5,
  },
});
