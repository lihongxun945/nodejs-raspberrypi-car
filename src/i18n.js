import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en.json'
import zh from './locales/zh.json'

const options = {
  fallbackLng: 'en',

  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ','
  },

  react: {
    wait: true
  }
}

options.resources = {
  en: en,
  zh: zh
}

export default () => {
  i18n
    .use(LanguageDetector)
    .init(options)

  const lang = localStorage.getItem('lang') || 'zh'
  i18n.changeLanguage(lang)
  return i18n
}
