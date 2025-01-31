import { screen, render, waitFor, fireEvent } from '@testing-library/react'
import Filters from '../Filters'
import { FilterImage } from '../../../entities/multigram'

const defaultProps = {
	filter: 'filter1977' as FilterImage,
	src: 'https://images.unsplash.com/photo-1675954099202-248ea9d6930e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=webp&fit=crop&w=900&q=100',
	name: 'Silver Island',
	setValue: jest.fn(),
}

const renderComponent = (props = defaultProps) => render(<Filters {...defaultProps} {...props} />)

describe('FiltersComponent', () => {
	it('should render the component with filter', () => {
		renderComponent()
		const wrapper = screen.getByText(/Original/)
		expect(wrapper).toBeInTheDocument()
	})

	it('should click user in filter', () => {
		renderComponent()
		const filter = screen.getByTestId(/filters-filterOriginal/)
		waitFor(() => {
			fireEvent.click(filter)
		})
	})
})
