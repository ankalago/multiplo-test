import { screen, render } from '@testing-library/react'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import store from './store/store'
import { Provider } from 'react-redux'

jest.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (str: any) => str,
	}),
}))

describe('AppComponent', () => {
	beforeEach(() => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>,
		)
	})

	it('should render the component', () => {
		const wrapper = screen.getByText(/Multigram/)
		expect(wrapper).toBeInTheDocument()
	})
})
