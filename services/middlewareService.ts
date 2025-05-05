import { DATA_AVAIL, DATA_DOC } from "@/constants/mock_data";
import { Doctor, Appointment } from "@/types";
import logger from "@/utils/logger";

const USE_MOCK = true;

const logAAPIError = (error: any, route?: string | undefined) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    logger.warn(
      `[MiddlewareAPIService] /${route} API Error - ${error.response.status}`,
    );
    logger.warn(error.response.status);
    error.response.data && logger.warn(error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    logger.warn(
      `[MiddlewareAPIService] /${route} API Error - no response: ${error.message}`,
    );
    logger.warn("[MiddlewareAPIService] No response");
    logger.warn(error.message);
    logger.warn(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    logger.warn(
      `[MiddlewareAPIService] /${route} API Error - no request: ${error.message}`,
    );
    // logger.warn(error.stack);
  }
};

export async function getDoctorInfoAsync(): Promise<Doctor[] | undefined> {
  const route = "doctor";
  try {
    if (USE_MOCK) {
      return Promise.resolve(DATA_DOC);
    }
  } catch (error) {
    logAAPIError(error, route);
    throw error;
  }
}

export async function getDoctorAvailabilityAsync(
  date: string,
): Promise<Appointment[] | undefined> {
  const route = "availability?date=" + date;
  try {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return Promise.resolve(DATA_AVAIL);
    }
  } catch (error) {
    logAAPIError(error, route);
    throw error;
  }
}

export async function saveBookingConfirmation(
  id: number,
): Promise<boolean | undefined> {
  const route = "bookings";
  try {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return Promise.resolve(true);
    }
  } catch (error) {
    logAAPIError(error, route);
    throw error;
  }
}
