import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import Card from '../Card'
import { IMultigram } from '../../../entities/multigram.ts'

jest.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (str: any) => str,
	}),
}))

const mockPost: IMultigram = {
	id: 1,
	title: 'Test Post',
	createdAt: 123123123,
	filter: 'filterOriginal',
	image: 'test-image.jpg',
	like: false,
}

jest.mock('../../../hooks/useTimeAgo.ts', () => ({
	useTimeAgo: () => ({
		daysTimeAgo: () => '2 hours ago',
	}),
}))

jest.mock('../../../services/useServiceFetch.ts', () => ({
	useServiceFetch: () => ({
		updatePost: jest.fn(),
	}),
}))

const renderComponent = (enableLink = false) =>
	render(
		<Router>
			<Card post={mockPost} enableLink={enableLink} />
		</Router>,
	)

describe('Card Component', () => {
	it('renders the card component', () => {
		renderComponent()
		expect(screen.getByTestId(`item-${mockPost.id}`)).toBeInTheDocument()
		expect(screen.getByText(mockPost.title)).toBeInTheDocument()
		expect(screen.getByText(/2 hours ago/)).toBeInTheDocument()
		expect(screen.getByTestId(`item-image-${mockPost.id}`)).toBeInTheDocument()
	})

	it('handles like button click', () => {
		const { updatePost } = require('../../../services/useServiceFetch.ts').useServiceFetch()
		renderComponent()
		const likeButton = screen.getByTestId(`icon-unlike-${mockPost.id}`)
		waitFor(() => {
			fireEvent.click(likeButton)
			expect(updatePost).toHaveBeenCalledWith(String(mockPost.id), true)
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
