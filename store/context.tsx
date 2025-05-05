import { Appointment } from "@/types";
import {
  createContext,
  ReactNode,
  use,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APPOINTMENTS, LANG_PREF } from "@/constants/Storage";
import logger from "@/utils/logger";
import i18n from "@/constants/Localization";

const AppContext = createContext<{
  updateAppState: () => Promise<void>;
  userLanguageOverride?: string | null;
  setUserLanguageOverride: (lang: string) => void;
  userAppointments?: Appointment[] | null;
  setUserAppointments: (appointment: Appointment[]) => void;
}>({
  updateAppState: async () => {},
  userLanguageOverride: null,
  setUserLanguageOverride: () => {},
  userAppointments: null,
  setUserAppointments: () => {},
});

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userLanguageOverride, setUserLanguageOverride] = useState<
    string | null
  >(null);

  const [userAppointments, setUserAppointments] = useState<Appointment[]>();

  const updateAppState = async () => {
    try {
      const appointments = await AsyncStorage.getItem(APPOINTMENTS);

      if (appointments) setUserAppointments(JSON.parse(appointments));
    } catch (error) {
      const e = error as Error;
      logger.warn(`Error updating app state: ${e.message}`);
      AsyncStorage.clear();
      logger.warn("Cleared AsyncStorage");
    }
  };

  useEffect(() => {
    updateAppState();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(APPOINTMENTS, JSON.stringify(userAppointments));
  }, [userAppointments]);

  useEffect(() => {
    AsyncStorage.setItem(LANG_PREF, userLanguageOverride || "");
  }, [userLanguageOverride]);

  return (
    <AppContext.Provider
      value={{
        updateAppState,
        userLanguageOverride,
        setUserLanguageOverride,
        userAppointments,
        setUserAppointments,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
