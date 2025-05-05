import { FlatList, StyleSheet } from "react-native";
import { getDoctorInfoAsync } from "@/services/middlewareService";
import { Text, View } from "@/components/Themed";
import { useAppContext } from "@/store/context";
import { AppointmentDetails } from "@/components/AppointmentDetails";
import { useQuery } from "@tanstack/react-query";
import { Doctor } from "@/types";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    console.log(
      "userAppointments",
      userAppointments?.map((a) => a.id),
    );
  }, [userAppointments]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("profile.title")}</Text>
      <FlatList
        data={userAppointments?.sort((a, b) => a.id - b.id)}
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
