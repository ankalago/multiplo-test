import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import Detail from '../Detail'
import multigramSlice from '../../../../store/states/multigram'
import { AppStore } from '../../../../store/store'

jest.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (str: any) => str,
	}),
}))

const renderComponent = (store: any) =>
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
	let store: AppStore

	beforeEach(() => {
		store = configureStore({
			reducer: {
				multigram: multigramSlice,
			},
			preloadedState: {
				multigram: [
					{ id: '1', title: 'Post 1', image: 'Image 1', filter: 'filterOriginal' },
					{ id: '2', title: 'Post 2', image: 'Image 2', filter: 'filterOriginal' },
				],
			},
		})
	})

	it('should render the Detail component with a post', () => {
		renderComponent(store)
		expect(screen.getByText(/Post 1/)).toBeInTheDocument()
		expect(screen.getByTestId('filter-Original')).toBeInTheDocument()
	})

	it('should return null if no post is found', () => {
		store = configureStore({
			reducer: {
				multigram: multigramSlice,
			},
			preloadedState: {
				multigram: [],
			},
		})

		const { container } = renderComponent(store)

		expect(container.firstChild).toBeNull()
	})
})
