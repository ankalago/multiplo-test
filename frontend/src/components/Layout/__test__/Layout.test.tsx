import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Layout from '../Layout'

jest.mock('../../Header', () => () => <div>Header</div>)
jest.mock('../../Footer', () => () => <div>Footer</div>)

describe('Layout', () => {
	it('should render Header, Outlet, and Footer', () => {
		const { getByText } = render(
			<BrowserRouter>
				<Layout />
			</BrowserRouter>,
		)

		expect(getByText('Header')).toBeInTheDocument()
		expect(getByText('Footer')).toBeInTheDocument()
	})
})
