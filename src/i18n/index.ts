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
  locale: 'ja-JP', // ロケールをセット
  fallbackLocale: 'en-US', // フォールバックロケールをセット
  messages, // ロケールメッセージをセット
  // その他オプションを指定できます
  // ...
})

export default i18n




