import { Appointment } from "@/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APPOINTMENTS, LANG_PREF } from "@/constants/Storage";
import logger from "@/utils/logger";

const AppContext = createContext<{
  updateAppState: () => Promise<void>;
  userLanguageOverride?: string | null;
  setUserLanguageOverride: (lang: string) => void;
  userAppointments?: Appointment[] | null;
  updateUserAppointments: (appointment: Appointment[]) => void;
}>({
  updateAppState: async () => {},
  userLanguageOverride: null,
  setUserLanguageOverride: () => {},
  userAppointments: null,
  updateUserAppointments: () => {},
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
      await AsyncStorage.clear();
      logger.warn("Cleared AsyncStorage");
    }
  };

  const updateUserAppointments = async (a: Appointment[]) => {
    setUserAppointments(a);
    await AsyncStorage.setItem(APPOINTMENTS, JSON.stringify(a));
  };

  useEffect(() => {
    updateAppState();
  }, []);

  return (
    <AppContext.Provider
      value={{
        updateAppState,
        userLanguageOverride,
        setUserLanguageOverride,
        userAppointments,
        updateUserAppointments,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
