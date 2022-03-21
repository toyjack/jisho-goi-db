import { createI18n } from 'vue-i18n'


import enUS from './en-US';
import jaJP from './ja-JP'
import zhCN from './zh-CN'

const messages = {
  'en-US': enUS,
  'ja-JP': jaJP,
  'zh-CN': zhCN
};

const i18n = createI18n({
  legacy: false,
  useScope: "global", 
  globalInjection: true,
  locale: 'ja-JP', 
  fallbackLocale: 'en-US', 
  messages, 
})

export default i18n




