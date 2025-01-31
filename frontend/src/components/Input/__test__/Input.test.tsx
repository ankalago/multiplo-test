import { screen, render, fireEvent } from '@testing-library/react'
import Input from '../Input'

describe('InputComponent', () => {
	beforeEach(() => {
		render(<Input name="test" label="Test" setValue={jest.fn()} value={'test'} />)
	})

	it('should render the component', () => {
		const wrapper = screen.getByText(/Test/)
		expect(wrapper).toBeInTheDocument()
	})

	it('should user change the value', () => {
		const name = screen.getByTestId(/test/)
		fireEvent.change(name, { target: { value: 'test' } })
	})
})
