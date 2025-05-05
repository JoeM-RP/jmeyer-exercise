import { StyleSheet } from "react-native";
import { Image } from "expo-image";

import { Button, Text, View } from "@/components/Themed";
import { router, useLocalSearchParams } from "expo-router";
import { Appointment, Doctor } from "@/types";
import { useEffect, useState } from "react";
import Separator from "@/components/Themed/Separator";
import i18n from "@/constants/Localization";
import { AppointmentDetails } from "@/components/AppointmentDetails";
import { saveBookingConfirmation } from "@/services/middlewareService";
import { useAppContext } from "@/store/context";

export default function ConfirmationScreen() {
  const { userAppointments, setUserAppointments } = useAppContext();
  const { appointment, doctor } = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [appointmentInfo, setAppointmentInfo] = useState<Appointment>();
  const [doctorInfo, setDoctorInfo] = useState<Doctor>();

  useEffect(() => {
    const appointmentData = JSON.parse(appointment as string) as Appointment;
    const doctorData = JSON.parse(doctor as string) as Doctor;

    setAppointmentInfo(appointmentData);
    setDoctorInfo(doctorData);
  }, [appointment, doctor]);

  async function confirmAppointmentAsync(): Promise<void> {
    setIsLoading(true);

    await saveBookingConfirmation(appointmentInfo!.id);

    const aptArray = userAppointments || [];
    aptArray.push(appointmentInfo!);
    setUserAppointments(aptArray);

    setIsLoading(false);

    router.canGoBack() && router.back();
    router.push("/(tabs)/two");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("booking.subtitle")}</Text>
      <Separator />
      <AppointmentDetails
        date={appointmentInfo?.date!}
        time={appointmentInfo?.time!}
      />
      <Text style={{ marginTop: 20 }}>With:</Text>
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          paddingHorizontal: 20,
        }}
      >
        <View
          id="col1"
          style={{ flex: 1, justifyContent: "center", maxWidth: "50%" }}
        >
          <Text style={styles.title}>{doctorInfo?.name}</Text>
          <Text accessibilityLabel={`Specialty: ${doctorInfo?.specialty}`}>
            {doctorInfo?.specialty}
          </Text>
          <View
            accessibilityLabel="Doctor reviews:"
            style={{ flexDirection: "row", gap: 10, paddingVertical: 10 }}
          >
            <Text accessibilityLabel={`${doctorInfo?.rating} stars`}>
              {doctorInfo?.rating} ⭐️
            </Text>
            <Text>
              {doctorInfo?.reviews} {i18n.t("global.reviews")}
            </Text>
          </View>
        </View>
        <Image
          source={{ uri: doctorInfo?.imageUrl }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      </View>
      <Button onPress={() => confirmAppointmentAsync()} disabled={isLoading}>
        {i18n.t("global.done")}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
