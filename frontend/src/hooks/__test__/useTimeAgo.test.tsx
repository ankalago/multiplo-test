import { render } from '@testing-library/react'
import { useTranslation } from 'react-i18next'
import { useTimeAgo } from '../useTimeAgo'
import { formatDate } from '../../utils/utils'

jest.mock('react-i18next', () => ({
	useTranslation: jest.fn(),
}))

jest.mock('../../utils/utils', () => ({
	formatDate: jest.fn(),
}))

const TestComponent = ({ date }: { date: number }) => {
	const { daysTimeAgo } = useTimeAgo()
	return <div>{daysTimeAgo(date)}</div>
}

describe('useTimeAgo', () => {
	const tMock = jest.fn()

	beforeEach(() => {
		;(useTranslation as jest.Mock).mockReturnValue({ t: tMock })
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('should return "few seconds ago" when the date is less than 10 seconds ago', () => {
		tMock.mockReturnValue('few seconds ago')
		const now = new Date().getTime()
		const { getByText } = render(<TestComponent date={now - 5000} />)
		expect(getByText('few seconds ago')).toBeInTheDocument()
	})

	it('should return the correct string for seconds ago', () => {
		tMock.mockImplementation((key) => (key === 'texts.seconds_ago' ? 'seconds ago' : ''))
		const now = new Date().getTime()
		const { getByText } = render(<TestComponent date={now - 30000} />)
		expect(getByText('30 seconds ago')).toBeInTheDocument()
	})

	it('should return the correct string for minutes ago', () => {
		tMock.mockImplementation((key) => (key === 'texts.minutes_ago' ? 'minutes ago' : ''))
		const now = new Date().getTime()
		const { getByText } = render(<TestComponent date={now - 600000} />)
		expect(getByText('10 minutes ago')).toBeInTheDocument()
	})

	it('should return the correct string for hours ago', () => {
		tMock.mockImplementation((key) => (key === 'texts.hours_ago' ? 'hours ago' : ''))
		const now = new Date().getTime()
		const { getByText } = render(<TestComponent date={now - 7200000} />)
		expect(getByText('2 hours ago')).toBeInTheDocument()
	})

	it('should return the correct string for yesterday', () => {
		tMock.mockImplementation((key) => {
			if (key === 'texts.yesterday') return 'yesterday'
			if (key === 'texts.preposition') return 'at'
			return ''
		})
		;(formatDate as jest.Mock).mockReturnValue('yesterday at 12:00 PM')
		const now = new Date().getTime()
		const yesterday = new Date(now - 86400000).getTime()
		const { getByText } = render(<TestComponent date={yesterday} />)
		expect(getByText('yesterday at 12:00 PM')).toBeInTheDocument()
	})
})
