import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import unflatten from 'unflatten';
import translation from './i18n/en/resource.json';

export type TSupportedLanguages = 'en' | 'he';

export function setLanguage(lng: TSupportedLanguages) {
  return Promise.all([
    import(`./i18n/${lng}/resource.json`).then(({ default: translation }) => {
      i18n.addResourceBundle(
        lng,
        'translation',
        unflatten(translation),
        false,
        true
      );
      i18n.changeLanguage(lng);
    }),
    // import(/* webpackChunkName: "dayjs.i18n." */ `dayjs/locale/${lng}`),
  ]);
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: unflatten(translation),
      },
    },
    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
  });
