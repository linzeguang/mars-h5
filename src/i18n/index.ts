import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import en from './locales/en-US';
import zh from './locales/zh-CN';

export type I18nKeys = keyof typeof en;

export enum Language {
  EN = 'en',
  ZH = 'zh',
}

export interface Lang {
  label: string;
  key: Language;
}

export const languages: Lang[] = [
  {
    label: 'English',
    key: Language.EN,
  },
  {
    label: '简体中文',
    key: Language.ZH,
  },
];

export const resources = {
  [Language.EN]: {
    translation: en,
  },
  [Language.ZH]: {
    translation: zh,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: Language.EN,
  fallbackLng: Language.EN,
  detection: {
    caches: ['localStorage'],
  },
});

export default i18n;
