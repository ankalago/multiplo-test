import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Footer from '../Footer'

const renderComponent = (path: string) =>
	render(
		<MemoryRouter initialEntries={[path]}>
			<Footer />
		</MemoryRouter>,
	)

describe('Footer Component', () => {
	it('should render HomeSolid icon when on home page', () => {
		renderComponent('/')
		expect(screen.getByTestId('link-home')).toBeInTheDocument()
		expect(screen.getByTestId('link-home').classList).toContain('text-multigram')
	})

	it('should render HomeOutline icon when not on home page', () => {
		renderComponent('/other')
		expect(screen.getByTestId('link-home')).toBeInTheDocument()
		expect(screen.getByTestId('link-home').classList).toContain('text-gray-800')
	})

	it('should render PlusCircleSolid icon when on add page', () => {
		renderComponent('/new')
		expect(screen.getByTestId('link-add')).toBeInTheDocument()
		expect(screen.getByTestId('link-add').classList).toContain('text-multigram')
	})

	it('should render PlusCircleOutline icon when not on add page', () => {
		renderComponent('/')
		expect(screen.getByTestId('link-add')).toBeInTheDocument()
		expect(screen.getByTestId('link-add').classList).toContain('text-gray-800')
	})
})
