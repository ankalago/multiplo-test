import { FC } from 'react'
import { ContentImage, WrapperImage } from './styles'
import { FilterImage } from '../../entities/multigram'
import { classNames } from '../../utils/utils'
import { FiltersComponents } from '../Filter/Filter'

interface Props {
	filter?: FilterImage
	src: string
	name: string
	setValue: Function
}

const Filters: FC<Props> = ({ filter, src, name, setValue }) => {
	const handleClick = (filter: FilterImage) => {
		setValue('filter', filter)
	}

	return (
		<>
			{Object.keys(FiltersComponents).map((item) => {
				const Component = FiltersComponents[item].component
				return (
					<WrapperImage key={item} className="inline-block mr-3" data-testid={`wrapper-${item}`}>
						<div className="bg-white text-xs font-bold text-gray-600">{FiltersComponents[item].label}</div>
						<ContentImage
							className={classNames(
								filter === item ? 'border-2 border-multigram' : '',
								'rounded-lg overflow-hidden w-24 h-24 bg-gray-100',
							)}
						>
							<Component
								src={src}
								alt={name}
								onClick={() => handleClick(item as FilterImage)}
								data-testid={`filters-${item}`}
								className="h-full mx-auto object-contain object-center"
							/>
						</ContentImage>
					</WrapperImage>
				)
			})}
		</>
	)
}

export default Filters
