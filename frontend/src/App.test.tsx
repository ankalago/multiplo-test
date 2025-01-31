import { render, screen, act } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import App from './App'
import multigramSlice from './store/states/multigram'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { AppStore } from './store/store'

jest.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (str: any) => str,
	}),
}))
const mock = new MockAdapter(axios)
mock.onGet('http://localhost:3000/api/v1/post').reply(200, { data: 'response' })
mock.onPost('http://localhost:3000/api/v1/post').reply(200, { data: 'response' })

describe('App Component', () => {
	let store: EnhancedStore<AppStore>

	beforeEach(() => {
		store = configureStore<AppStore>({
			reducer: {
				multigram: multigramSlice,
			},
			preloadedState: {
				multigram: [
					{
						id: '1',
						title: 'Post 1',
						image: 'Image 1',
						filter: 'filterOriginal',
						like: true,
						createdAt: new Date().getTime(),
					},
				],
			},
		})
	})

	it('should render the Home component for the root path', async () => {
		render(
			<Provider store={store}>
				<Router>
					<App />
				</Router>
			</Provider>,
		)

		await act(async () => {
			expect(screen.getByText('Multigram')).toBeInTheDocument()
		})
	})
})
