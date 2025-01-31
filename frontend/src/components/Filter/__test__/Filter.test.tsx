import { screen, render } from '@testing-library/react'
import Filter from '../Filter'
import { FilterImage } from '../../../entities/multigram'

const defaultProps = {
	filter: 'filter1977' as FilterImage,
	src: 'https://images.unsplash.com/photo-1675954099202-248ea9d6930e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=webp&fit=crop&w=900&q=100',
	alt: 'Silver Island',
	className: '',
}

const renderComponent = (props = defaultProps) => render(<Filter {...defaultProps} {...props} />)

describe('FilterComponent', () => {
	it('should render the component with filter', () => {
		renderComponent()
		const wrapper = screen.getByTestId(/filter-1977/)
		expect(wrapper).toBeInTheDocument()
	})

	it('should render the component without filter', () => {
		renderComponent({ ...defaultProps, filter: 'Filter1977' as FilterImage })
		const wrapper = screen.getByTestId(/filter-filterOriginal/)
		expect(wrapper).toBeInTheDocument()
	})
})
