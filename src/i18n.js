import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/translation.json";
import fr from "./locales/fr/translation.json";
import it from "./locales/it/translation.json";
import de from "./locales/de/translation.json";
import zh from "./locales/zh/translation.json";

i18n
  .use(LanguageDetector) // détecte la langue du navigateur
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      it: { translation: it },
      de: { translation: de },
      zh: { translation: zh },
    },
    lng: "en", // langue par défaut
    fallbackLng: "en", // si la langue détectée n’existe pas
    interpolation: { escapeValue: false },
  });

export default i18n;
