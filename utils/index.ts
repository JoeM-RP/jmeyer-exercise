import i18n from "@/constants/Localization";

export const isDev = process.env.NODE_ENV === "development";

export const getFormattedDate = (date: string) => {
  const d = Date.parse(`${date}T00:00:00`);
  return new Date(d).toLocaleString(i18n.language || "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const getFormattedTime = (time: string) => {
  const d = Date.parse(`1970-01-01T${time}`);
  return new Date(d).toLocaleString(i18n.language || "en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
