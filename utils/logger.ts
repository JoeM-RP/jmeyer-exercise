/**
 * Placeholder logger for the app. In a real app, this would be a good place to send analytics to a provider like
 * Sentry or Firebase.
 */

// Duplicates logic from utils/index to avoid ciruclar reference
const isDev = process.env.NODE_ENV === "development";

export default {
  fatal: (e: Error): void => {
    // eslint-disable-next-line no-console
    console.error(e);
  },
  error(e: Error): void {
    // eslint-disable-next-line no-console
    console.warn(e);
  },
  warn(message: string | Error): void {
    const v = JSON.stringify(message);
    // eslint-disable-next-line no-console
    console.warn(message);
  },
  log(...args: unknown[]): void {
    // eslint-disable-next-line no-console
    console.log(...args);
  },
  trace(message: string, time: number, ...args: unknown[]): void {
    const LIMIT = 20000;

    if (time > LIMIT) {
      // eslint-disable-next-line no-console
      console.trace(message);

      // eslint-disable-next-line no-console
      console.trace(`Request exceeded ${LIMIT} ms - logging to Firebase`);
    }
  },
  debug(...args: unknown[]): void {
    // setCustomTag(`app_debug`, JSON.stringify(args));
    // eslint-disable-next-line no-console
    if (isDev) console.debug(...args);
  },
};
