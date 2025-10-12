import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translation files
import enGlobal from '../locales/en/global.json'
import enHome from '../locales/en/home.json'
import ptGlobal from '../locales/pt/global.json'
import ptHome from '../locales/pt/home.json'
import esGlobal from '../locales/es/global.json'
import esHome from '../locales/es/home.json'

const resources = {
  en: {
    global: enGlobal,
    home: enHome
  },
  pt: {
    global: ptGlobal,
    home: ptHome
  },
  es: {
    global: esGlobal,
    home: esHome
  }
}

// Get saved language from localStorage
const getSavedLanguage = (): string => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('language')
    return saved ? JSON.parse(saved).sigla : 'en'
  }
  return 'en'
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: getSavedLanguage(),
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  })

export default i18n