import { act, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import Detail from '../Detail'
import multigramSlice from '../../../../store/states/multigram'
import { AppStore } from '../../../../store/store'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { IMultigram } from '../../../../entities/multigram'

const multigram: IMultigram[] = [
	{
		id: '1',
		title: 'Post 1',
		image: 'Image 1',
		filter: 'filterOriginal',
		like: false,
		createdAt: new Date().getTime(),
	},
	{
		id: '2',
		title: 'Post 2',
		image: 'Image 2',
		filter: 'filterOriginal',
		like: false,
		createdAt: new Date().getTime(),
	},
]

jest.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (str: any) => str,
	}),
}))
const mock = new MockAdapter(axios)
mock.onGet('http://localhost:3000/api/v1/post').reply(200, multigram)
mock.onPost('http://localhost:3000/api/v1/post').reply(200, { data: 'response' })

const renderComponent = (store: EnhancedStore<AppStore>) =>
	render(
		<Provider store={store}>
			<MemoryRouter initialEntries={['/detail/1']}>
				<Routes>
					<Route path="/detail/:id" element={<Detail />} />
				</Routes>
			</MemoryRouter>
		</Provider>,
	)

describe('Detail Component', () => {
	let store: EnhancedStore<AppStore>

	beforeEach(() => {
		store = configureStore<AppStore>({
			reducer: {
				multigram: multigramSlice,
			},
			preloadedState: {
				multigram: multigram,
			},
		})
	})

	it('should render the Detail component with a post', async () => {
		renderComponent(store)
		await act(async () => {
			expect(screen.getByText(/Post 1/)).toBeInTheDocument()
			expect(screen.getByTestId('filter-Original')).toBeInTheDocument()
		})
	})

	it('should return null if no post is found', async () => {
		store = configureStore({
			reducer: {
				multigram: multigramSlice,
			},
			preloadedState: {
				multigram: [],
			},
		})

		const { container } = renderComponent(store)

		await act(async () => {
			expect(container.firstChild).toBeNull()
		})
	})
})
