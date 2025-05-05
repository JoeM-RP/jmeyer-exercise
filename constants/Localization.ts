/* eslint-disable import/no-named-as-default-member */
/**
 * Derived from expo localization guide:
 * https://docs.expo.dev/versions/latest/sdk/localization/
 */

import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { en, es, jp } from "./localizations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LANG_PREF } from "./Storage";

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
  jp: {
    translation: jp,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: Localization.getLocales()[0].languageTag, // language to use
    fallbackLng: "en", // fallback language

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

AsyncStorage.getItem(LANG_PREF).then((l) => {
  i18n.changeLanguage(l ?? Localization.getLocales()[0].languageTag);
});

export default i18n;
