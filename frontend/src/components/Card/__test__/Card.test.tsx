import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter as Router, useNavigate } from 'react-router-dom'
import Card from '../Card'
import { IMultigram } from '../../../entities/multigram'

jest.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (str: any) => str,
	}),
}))

const mockPost: IMultigram = {
	id: '1',
	title: 'Test Post',
	createdAt: 123123123,
	filter: 'filterOriginal',
	image: 'test-image.jpg',
	like: false,
}

jest.mock('../../../hooks/useTimeAgo', () => ({
	useTimeAgo: () => ({
		daysTimeAgo: () => '2 hours ago',
	}),
}))

jest.mock('../../../services/useServiceFetch', () => ({
	useServiceFetch: () => ({
		updatePost: jest.fn(),
	}),
}))

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn(),
}))

const renderComponent = (enableLink = false) =>
	render(
		<Router>
			<Card post={mockPost} enableLink={enableLink} />
		</Router>,
	)

describe('Card Component', () => {
	const mockNavigate = useNavigate as jest.Mock

	it('renders the card component', () => {
		renderComponent()
		expect(screen.getByTestId(`item-${mockPost.id}`)).toBeInTheDocument()
		expect(screen.getByText(mockPost.title)).toBeInTheDocument()
		expect(screen.getByText(/2 hours ago/)).toBeInTheDocument()
		expect(screen.getByTestId(`item-image-${mockPost.id}`)).toBeInTheDocument()
	})

	it('handles like button click', () => {
		const { updatePost } = require('../../../services/useServiceFetch').useServiceFetch()
		renderComponent(true)
		const likeButton = screen.getByTestId(`icon-unlike-${mockPost.id}`)
		waitFor(() => {
			fireEvent.click(likeButton)
			expect(updatePost).toHaveBeenCalledWith(String(mockPost.id), true)
		})
	})

	it('handles post click disable', () => {
		const { updatePost } = require('../../../services/useServiceFetch').useServiceFetch()
		renderComponent()
		const imageElement = screen.getByTestId(`wrap-image-${mockPost.id}`)
		waitFor(() => {
			fireEvent.click(imageElement)
			expect(updatePost).toHaveBeenCalledWith(String(mockPost.id), false)
		})
	})

	it('handles go to post click', async () => {
		const navigateMock = jest.fn()
		mockNavigate.mockReturnValue(navigateMock)
		renderComponent(true)
		const imageElement = screen.getByTestId(`wrap-image-${mockPost.id}`)

		fireEvent.click(imageElement)

		await waitFor(() => {
			expect(navigateMock).toHaveBeenCalledWith(`/detail/${mockPost.id}`)
		})
	})

	it('handles card click when enableLink is true', () => {
		renderComponent(true)
		const cardImage = screen.getByTestId(`item-image-${mockPost.id}`)
		waitFor(() => {
			fireEvent.click(cardImage)
			expect(window.location.pathname).toBe(`/detail/${mockPost.id}`)
		})
	})
})
