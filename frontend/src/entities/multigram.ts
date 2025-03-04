export interface IMultigram {
	id?: string
	title: string
	image: string
	filter: FilterImage
	like: boolean
	createdAt: number
}

export type FilterImage =
	| 'filterOriginal'
	| 'filter1977'
	| 'filterAden'
	| 'filterAmaro'
	| 'filterBrannan'
	| 'filterBrooklyn'
	| 'filterClarendon'
	| 'filterInkWell'
	| 'filterLofi'
