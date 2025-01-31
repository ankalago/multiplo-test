import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import Add from '../Add'
import multigramSlice from '../../../../store/states/multigram'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

jest.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (str: any) => str,
	}),
}))

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn(),
}))

const mock = new MockAdapter(axios)
mock.onGet('http://localhost:3000/api/v1/post').reply(200, { data: 'response' })
mock.onPost('http://localhost:3000/api/v1/post').reply(200, { data: 'response' })

const renderComponent = (store: any) =>
	render(
		<Provider store={store}>
			<MemoryRouter>
				<Add />
			</MemoryRouter>
		</Provider>,
	)

describe('Add Component', () => {
	let store: any
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
	})

	it('should render the Add component', async () => {
		await act(async () => {
			renderComponent(store)
		})
		expect(screen.getByText(/Lofi/)).toBeInTheDocument()
	})

	it('should add a new post', async () => {
		const navigateMock = jest.fn()
		mockNavigate.mockReturnValue(navigateMock)

		await act(async () => {
			renderComponent(store)
		})

		await act(async () => {
			fireEvent.change(screen.getByTestId('title'), { target: { value: 'New Post' } })
			fireEvent.change(screen.getByTestId('image'), { target: { value: 'New Image' } })
			fireEvent.click(screen.getByTestId('submit'))
		})

		await waitFor(() => {
			expect(navigateMock).toHaveBeenCalledWith('/')
		})
	})
})
