import { StyleSheet } from "react-native";
import { getDoctorInfoAsync } from "@/services/middlewareService";
import { Text, View } from "@/components/Themed";
import { FlashList } from "@shopify/flash-list";
import { useAppContext } from "@/store/context";
import { AppointmentDetails } from "@/components/AppointmentDetails";
import { useQuery } from "@tanstack/react-query";
import { Doctor } from "@/types";
import { useState } from "react";
import i18n from "@/constants/Localization";

export default function TabTwoScreen() {
  const { userAppointments } = useAppContext();
  const [doctorInfo, setDoctorInfo] = useState<Doctor[] | undefined>(undefined);

  const getDoctorInfo = async (): Promise<Doctor[] | undefined> => {
    const response = await getDoctorInfoAsync();
    return response;
  };

  const { isFetching, isRefetching } = useQuery({
    queryKey: ["profile-page"],
    queryFn: async () => {
      const doctorData = await getDoctorInfo();

      setDoctorInfo(doctorData);

      return doctorData;
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("profile.title")}</Text>
      <FlashList
        data={userAppointments}
        renderItem={(i) => {
          const { date, time, doctorId } = i.item;

          const doctor = doctorInfo?.find((doc) => doc.id === doctorId);
          return (
            <View
              style={{
                marginVertical: 10,
                paddingHorizontal: 20,
                gap: 4,
              }}
            >
              <AppointmentDetails date={date} time={time} />
              <Text style={styles.subTitle}>{doctor?.name}</Text>
            </View>
          );
        }}
        ListEmptyComponent={() => (
          <Text style={styles.text}>{i18n.t("profile.none")}</Text>
        )}
        estimatedItemSize={100}
        refreshing={isFetching || isRefetching}
      />
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 400,
  },
  text: {
    paddingHorizontal: 20,
  },
});
