import { render, screen } from '@testing-library/react'
import Home from '../Home'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter as Router } from 'react-router-dom'
import multigramSlice from '../../../../store/states/multigram'
import { AppStore } from '../../../../store/store'

jest.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (str: any) => str,
	}),
}))

describe('Home Component', () => {
	let store: AppStore

	beforeEach(() => {
		store = configureStore({
			reducer: {
				multigram: multigramSlice,
			},
			preloadedState: {
				multigram: [{ id: '1', title: 'Post 1', image: 'Image 1', filter: 'filterOriginal', like: true }],
			},
		})
	})

	it('should render the Home component with CardContainer', () => {
		render(
			<Provider store={store}>
				<Router>
					<Home />
				</Router>
			</Provider>,
		)

		expect(screen.getByTestId('item-image-1')).toBeInTheDocument()
	})
})
