import { FlatList, Pressable, StyleSheet } from "react-native";

import { RefreshControl, Text, View } from "@/components/Themed";
import { useQuery } from "@tanstack/react-query";
import {
  getDoctorAvailabilityAsync,
  getDoctorInfoAsync,
} from "@/services/middlewareService";
import { useEffect, useState } from "react";
import { Appointment, Doctor } from "@/types";
import i18n from "@/constants/Localization";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppointmentDetails } from "@/components/AppointmentDetails";
import { useAppContext } from "@/store/context";
import logger from "@/utils/logger";

export default function TabOneScreen() {
  const insets = useSafeAreaInsets();
  const { userAppointments } = useAppContext();
  const [localAppointments, setLocalAppointments] = useState<Appointment[]>();

  const [doctorInfo, setDoctorInfo] = useState<Doctor[] | undefined>(undefined);

  const getAppointments = async (): Promise<Appointment[]> => {
    logger.debug("Fetching appointments...");
    const response = await getDoctorAvailabilityAsync("2023-10-01");
    return response || [];
  };

  const getDoctorInfo = async (): Promise<Doctor[] | undefined> => {
    logger.debug("Fetching doctor info...");
    const response = await getDoctorInfoAsync();
    setDoctorInfo(response);
    return response;
  };

  // This is a workaround to set the booked status of the appointment when it is set
  // locally - if there were a proper backend, this status would naturally be set there
  const getIsBookedOverride = (id: number, isBooked: boolean) => {
    if (isBooked) return true;
    if (!localAppointments) return isBooked;

    return localAppointments.some((apt) => id.valueOf() === apt.id.valueOf());
  };

  useEffect(() => {
    if (userAppointments) {
      const sortedAppointments = userAppointments.sort((a, b) => a.id - b.id);
      setLocalAppointments(sortedAppointments);
    }
  }, [userAppointments]);

  const { isFetching, isError, data, error, refetch, isRefetching } = useQuery({
    queryKey: ["home-page"],
    queryFn: async () => {
      const [appointmentData] = await Promise.all([
        getAppointments(),
        getDoctorInfo(),
      ]);

      // sort by acending date and time by default
      return appointmentData.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);

        return dateA.getTime() - dateB.getTime();
      });
    },
  });

  const renderAppointments = (i: any) => {
    const { id, date, time, doctorId, booked } = i.item;

    const isBooked = getIsBookedOverride(id, booked) || booked;

    if (!doctorInfo) {
      logger.warn("Doctor info is not available");
    }

    const doctor = doctorInfo?.find((doc) => doc.id === doctorId);
    return (
      <Pressable
        id={`Appointment for: ${date} ${time}`}
        accessibilityRole="button"
        accessibilityState={{ disabled: isBooked }}
        style={{ marginVertical: 5, opacity: isBooked ? 0.5 : 1 }}
        onPress={async () => {
          router.push(
            `/confirmation?appointment=${JSON.stringify(i.item)}&doctor=${JSON.stringify(doctor)}`,
          );
        }}
        disabled={isBooked}
      >
        {({ pressed }) => (
          <View
            style={{
              marginVertical: 10,
              paddingHorizontal: 20,
              gap: 4,
              opacity: pressed ? 0.5 : 1,
            }}
          >
            <AppointmentDetails date={date} time={time} />
            <Text
              style={styles.subTitle}
              accessibilityLabel={`with ${doctor?.name}.`}
            >
              {doctor?.name}
            </Text>
            <Text
              accessibilityLabel={`This appointment is ${booked ? "unavailable" : "available"}`}
            >
              {isBooked
                ? i18n.t("appointment.unavailable")
                : i18n.t("appointment.available")}
            </Text>
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>{i18n.t("booking.listing")}</Text>
      <FlatList
        data={data}
        renderItem={(i) => renderAppointments(i)}
        refreshing={isFetching || isRefetching}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
        ListFooterComponent={() => {
          return <Text>{isError ? `Error: ${error}` : ""}</Text>;
        }}
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
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 400,
  },
  text: {
    marginVertical: 5,
  },
});
