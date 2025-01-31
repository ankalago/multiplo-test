import { render } from '@testing-library/react'
import 'jest-styled-components'
import { WrapperFilterImage } from '../styles'

describe('Filter Styles', () => {
	it('should apply styles for Filter1977', () => {
		const { container } = render(<WrapperFilterImage className="filter1977" />)
		expect(container.getElementsByTagName('img')[0].getAttribute('class')).toContain('filter1977')
	})

	it('should apply styles for FilterAden', () => {
		const { container } = render(<WrapperFilterImage className="filterAden" />)
		expect(container.getElementsByTagName('img')[0].getAttribute('class')).toContain('filterAden')
	})

	it('should apply styles for FilterAmaro', () => {
		const { container } = render(<WrapperFilterImage className="filterAmaro" />)
		expect(container.getElementsByTagName('img')[0].getAttribute('class')).toContain('filterAmaro')
	})

	it('should apply styles for FilterBrannan', () => {
		const { container } = render(<WrapperFilterImage className="filterBrannan" />)
		expect(container.getElementsByTagName('img')[0].getAttribute('class')).toContain('filterBrannan')
	})

	it('should apply styles for FilterBrooklyn', () => {
		const { container } = render(<WrapperFilterImage className="filterBrooklyn" />)
		expect(container.getElementsByTagName('img')[0].getAttribute('class')).toContain('filterBrooklyn')
	})

	it('should apply styles for FilterClarendon', () => {
		const { container } = render(<WrapperFilterImage className="filterClarendon" />)
		expect(container.getElementsByTagName('img')[0].getAttribute('class')).toContain('filterClarendon')
	})

	it('should apply styles for FilterInkWell', () => {
		const { container } = render(<WrapperFilterImage className="filterInkWell" />)
		expect(container.getElementsByTagName('img')[0].getAttribute('class')).toContain('filterInkWell')
	})

	it('should apply styles for FilterLofi', () => {
		const { container } = render(<WrapperFilterImage className="filterLofi" />)
		expect(container.getElementsByTagName('img')[0].getAttribute('class')).toContain('filterLofi')
	})
})
