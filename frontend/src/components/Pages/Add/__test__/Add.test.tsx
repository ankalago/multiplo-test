import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import Add from '../Add'
import multigramSlice from '../../../../store/states/multigram'
import { AppStore } from '../../../../store/store'
import { useNavigate } from 'react-router-dom'

jest.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (str: any) => str,
	}),
}))

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn(),
}))

jest.mock('../../../../services/useServiceFetch.ts', () => ({
	useServiceFetch: () => ({
		createPost: jest.fn().mockResolvedValue({}),
	}),
}))

const renderComponent = (store: any) =>
	render(
		<Provider store={store}>
			<MemoryRouter>
				<Add />
			</MemoryRouter>
		</Provider>,
	)

describe('Add Component', () => {
	let store: AppStore
	const mockNavigate = useNavigate as jest.Mock

	beforeEach(() => {
		store = configureStore({
			reducer: {
				multigram: multigramSlice,
			},
			preloadedState: {
				multigram: [],
			},
		})
		const navigateMock = jest.fn()
		mockNavigate.mockReturnValue(navigateMock)
	})

	it('should render the Add component', () => {
		renderComponent(store)
		expect(screen.getByText(/Lofi/)).toBeTruthy()
	})

	it('should add a new post', async () => {
		renderComponent(store)
		fireEvent.change(screen.getByTestId('title'), { target: { value: 'New Post' } })
		fireEvent.change(screen.getByTestId('image'), { target: { value: 'New Image' } })
		fireEvent.click(screen.getByTestId('submit'))

		await waitFor(() => {
			expect(mockNavigate()).toHaveBeenCalledWith('/')
		})
	})
})
