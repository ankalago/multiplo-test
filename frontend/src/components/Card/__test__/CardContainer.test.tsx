import { render, screen, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import CardContainer from '../CardContainer'
import { BrowserRouter as Router } from 'react-router-dom'
import multigramSlice from '../../../store/states/multigram'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { AppStore } from '../../../store/store'

jest.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (str: any) => str,
	}),
}))

const mock = new MockAdapter(axios)
mock
	.onGet('http://localhost:3000/api/v1/post')
	.reply(200, { data: [{ id: '1', title: 'Post 1', image: 'Image 1', filter: 'filterOriginal', like: true }] })

describe('CardContainer Component', () => {
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

	it('should render the CardContainer component with posts', async () => {
		render(
			<Provider store={store}>
				<Router>
					<CardContainer />
				</Router>
			</Provider>,
		)
		await act(async () => {
			expect(screen.getByText(/Post 1/)).toBeInTheDocument()
			expect(screen.getByAltText('Post 1')).toHaveAttribute('src', 'Image 1')
		})
	})
})
