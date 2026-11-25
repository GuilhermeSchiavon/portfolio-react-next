import { createInstance, type i18n as I18n } from 'i18next'
import { initReactI18next } from 'react-i18next'
import type { Locale } from './locale'

import enGlobal from '../locales/en/global.json'
import enHome from '../locales/en/home.json'
import ptGlobal from '../locales/pt/global.json'
import ptHome from '../locales/pt/home.json'

const resources = {
  en: { global: enGlobal, home: enHome },
  pt: { global: ptGlobal, home: ptHome },
}

// Uma instância por idioma, criada de forma síncrona com os textos já
// embutidos. O idioma vem do servidor (cookie / Accept-Language), então o HTML
// renderizado e a hidratação no navegador usam sempre o mesmo texto.
// Antes o idioma era lido do localStorage só no cliente, o que causava os
// erros de hidratação (#418/#423) em produção.
export function createI18n(locale: Locale): I18n {
  const instance = createInstance()
  instance.use(initReactI18next).init({
    resources,
    lng: locale,
    fallbackLng: 'en',
    defaultNS: 'home',
    interpolation: { escapeValue: false },
    initImmediate: false,
    react: { useSuspense: false },
  })
  return instance
}
