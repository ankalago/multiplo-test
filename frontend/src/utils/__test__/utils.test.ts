import { classNames, formatDate } from '../utils'
import { MONTH_NAMES } from '../../constants'

describe('Utils functions', () => {
	describe('classNames', () => {
		it('should join class names with a space', () => {
			expect(classNames('class1', 'class2')).toBe('class1 class2')
		})

		it('should filter out falsy values', () => {
			expect(classNames('class1', '', 'class2', '', 'class3')).toBe('class1 class2 class3')
		})

		it('should return an empty string if no classes are provided', () => {
			expect(classNames()).toBe('')
		})
	})

	describe('formatDate', () => {
		it('should format date correctly without prefixDate', () => {
			const date = new Date(2023, 0, 1, 10, 5) // January 1, 2023, 10:05
			expect(formatDate(date.getTime())).toBe(`1 ${MONTH_NAMES[0]} 2023 at 10:05`)
		})

		it('should format date correctly with prefixDate', () => {
			const date = new Date(2023, 0, 1, 10, 5) // January 1, 2023, 10:05
			expect(formatDate(date.getTime(), 'Today')).toBe('Today at 10:05')
		})

		it('should format date correctly with different preposition', () => {
			const date = new Date(2023, 0, 1, 10, 5) // January 1, 2023, 10:05
			expect(formatDate(date.getTime(), 'Today', 'on')).toBe('Today on 10:05')
		})
	})
})
