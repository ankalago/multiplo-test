import i18n, { Resource } from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import translationEn from './en/translation.json'
import translationEs from './es/translation.json'
import { isProduction } from '../constants'

export enum LANGUAGE_ENUM {
	en = 'en',
	es = 'es',
}

export const resources: Resource = {
	[LANGUAGE_ENUM.en]: {
		translation: translationEn,
	},
	[LANGUAGE_ENUM.es]: {
		translation: translationEs,
	},
} as const

const lang: keyof typeof LANGUAGE_ENUM = LANGUAGE_ENUM['en']

const defaultLanguage = isProduction
	? {
			fallbackLng: LANGUAGE_ENUM.en,
			lng: LANGUAGE_ENUM.en,
		}
	: {
			lng: lang,
			fallbackLng: lang,
		}

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		...defaultLanguage,
		debug: !isProduction,
		interpolation: {
			escapeValue: false,
		},
		resources,
	})

export default i18n
