import { MONTH_NAMES } from '../constants'

export const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ')

export const formatDate = (inputDate: number, prefixDate = '', preposition = 'at') => {
	const date = new Date(inputDate)
	const day = date.getDate()
	const month = MONTH_NAMES[date.getMonth()]
	const year = date.getFullYear()
	const hours = date.getHours()
	const minutes = date.getMinutes()
	const minutesFormat = minutes < 10 ? `0${minutes}` : minutes
	if (prefixDate) {
		return `${prefixDate} ${preposition} ${hours}:${minutesFormat}`
	}
	return `${day} ${month} ${year} ${preposition} ${hours}:${minutesFormat}`
}
