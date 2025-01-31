import {
	Filter1977,
	FilterAden,
	FilterAmaro,
	FilterBrannan,
	FilterBrooklyn,
	FilterClarendon,
	FilterInkWell,
	FilterLofi,
	FilterOriginal,
} from '../Filters/styles'
import { StyledComponent } from 'styled-components'
import { FilterImage } from '../../entities/multigram'
import { FC } from 'react'

type ItemFilterComponent = {
	component: StyledComponent<'img', any, { className: string }, any>
	label: string
}

export const FiltersComponents: Record<string, ItemFilterComponent> = {
	filterOriginal: {
		component: FilterOriginal,
		label: 'Original',
	},
	filter1977: {
		component: Filter1977,
		label: '1977',
	},
	filterAden: {
		component: FilterAden,
		label: 'Aden',
	},
	filterAmaro: {
		component: FilterAmaro,
		label: 'Amaro',
	},
	filterBrannan: {
		component: FilterBrannan,
		label: 'Brannan',
	},
	filterBrooklyn: {
		component: FilterBrooklyn,
		label: 'Brooklyn',
	},
	filterClarendon: {
		component: FilterClarendon,
		label: 'Clarendon',
	},
	filterInkWell: {
		component: FilterInkWell,
		label: 'InkWell',
	},
	filterLofi: {
		component: FilterLofi,
		label: 'Lofi',
	},
}

interface Props {
	filter: FilterImage
	src: string
	alt: string
	className: string
}

const Filter: FC<Props> = (props) => {
	const component = FiltersComponents[props.filter]
	const Component = component?.component ?? FiltersComponents['filterOriginal'].component
	return (
		<Component data-testid={component?.label ? `filter-${component?.label}` : 'filter-filterOriginal'} {...props} />
	)
}

export default Filter
