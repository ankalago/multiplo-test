import { screen, render, waitFor, fireEvent } from '@testing-library/react'
import Header from '../Header'
import { BrowserRouter } from 'react-router-dom'

jest.mock('i18next', () => ({
	changeLanguage: () => new Promise(() => {}),
}))

const renderComponent = () =>
	render(
		<BrowserRouter>
			<Header />
		</BrowserRouter>,
	)

describe('HeaderComponent', () => {
	it('should render the component with filter', () => {
		renderComponent()
		const wrapper = screen.getByText(/Multigram/)
		expect(wrapper).toBeInTheDocument()
	})

	it('should click user in flag es', () => {
		renderComponent()
		const filter = screen.getByTestId(/es/)
		waitFor(() => {
			fireEvent.click(filter)
		})
	})

	it('should click user in flag en', () => {
		renderComponent()
		const filter = screen.getByTestId(/en/)
		waitFor(() => {
			fireEvent.click(filter)
		})
	})
})
