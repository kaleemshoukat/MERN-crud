import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

let local=localStorage.getItem('localization');
if (!local){
    local='en'
}

i18n.use(initReactI18next).init({
    fallbackLng: local,
    lng: local,
    resources: {
        en: {
            translations: require('./locales/en/translations.json')
        },
        ur: {
            translations: require('./locales/ur/translations.json')
        }
    },
    ns: ['translations'],
    defaultNS: 'translations'
});

i18n.languages = ['en', 'ur'];

export default i18n;