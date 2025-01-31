import { render, screen, act } from '@testing-library/react'
import Home from '../Home'
import { Provider } from 'react-redux'
import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import { BrowserRouter as Router } from 'react-router-dom'
import multigramSlice from '../../../../store/states/multigram'
import { AppStore } from '../../../../store/store'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

jest.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (str: any) => str,
	}),
}))
const mock = new MockAdapter(axios)
mock
	.onGet('http://localhost:3000/api/v1/post')
	.reply(200, { data: [{ id: '1', title: 'Post 1', image: 'Image 1', filter: 'filterOriginal', like: true }] })
mock.onPost('http://localhost:3000/api/v1/post').reply(200, { data: 'response' })

describe('Home Component', () => {
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

	it('should render the Home component with CardContainer', async () => {
		render(
			<Provider store={store}>
				<Router>
					<Home />
				</Router>
			</Provider>,
		)

		await act(async () => {
			expect(screen.getByTestId('item-image-1')).toBeInTheDocument()
		})
	})
})
