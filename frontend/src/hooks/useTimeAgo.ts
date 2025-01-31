import { useTranslation } from 'react-i18next'
import { formatDate } from '../utils/utils'

export const useTimeAgo = () => {
	const { t } = useTranslation()

	const daysTimeAgo = (dateParam: number) => {
		const date = new Date(dateParam).getTime()
		const today = new Date().getTime()
		const yesterday = new Date(today - 86400000).getTime()
		const seconds = Math.round((today - date) / 1000)
		const minutes = Math.round(seconds / 60)
		const hours = Math.round(minutes / 60)
		const isYesterday = yesterday === date

		if (seconds < 10) {
			return t('texts.few_seconds_ago')
		} else if (seconds < 60) {
			return `${seconds} ${t('texts.seconds_ago')}`
		} else if (seconds < 90) {
			return t('texts.about_minute_ago')
		} else if (minutes < 60) {
			return `${minutes} ${t('texts.minutes_ago')}`
		} else if (hours < 24) {
			return `${hours} ${t('texts.hours_ago')}`
		} else if (isYesterday) {
			return formatDate(date, t('texts.yesterday') as string, t('texts.preposition') as string)
		}
		return formatDate(date)
	}

	return { daysTimeAgo }
}
