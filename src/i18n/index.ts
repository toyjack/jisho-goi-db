import { createI18n } from 'vue-i18n'


import enUS from './en';
import jaJP from './ja'
import zhCN from './zh'

const messages = {
  '日本語': jaJP,
  'English': enUS,
  '中文': zhCN
};

const i18n = createI18n({
  legacy: false,
  useScope: "global", 
  globalInjection: true,
  locale: '日本語', 
  fallbackLocale: 'English', 
  messages, 
})

export default i18n




