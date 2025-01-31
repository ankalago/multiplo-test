import { ChangeEvent, FC, useEffect, useState } from 'react'
import { WrapperInput } from './styles'

type Props = {
	name: string
	label?: string
	placeholder?: string
	className?: string
	classNameLabel?: string
	setValue?: Function
	value?: string
}

const Input: FC<Props> = ({ name, label, placeholder, className, classNameLabel, setValue, value = '' }) => {
	const [valueInput, setValueInput] = useState(value)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const valueInput = e.target.value
		setValueInput(valueInput)
		setValue && setValue(name, valueInput)
	}

	useEffect(() => {
		setValueInput(value)
	}, [value])

	return (
		<>
			{label && (
				<label htmlFor={name} className={classNameLabel}>
					{label}
				</label>
			)}
			<WrapperInput>
				<input
					type="text"
					id={name}
					placeholder={placeholder}
					value={valueInput || ''}
					onChange={handleChange}
					className={`outline-none border-[1.5px] p-2 mt-1 block w-full rounded-sm shadow-sm focus:border-multigram focus:ring-multigram sm:text-sm ${className}`}
					data-testid={name}
				/>
			</WrapperInput>
		</>
	)
}

export default Input
