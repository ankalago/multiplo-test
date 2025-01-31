import { FC } from 'react'
import { HomeIcon as HomeSolid, PlusCircleIcon as PlusCircleSolid } from '@heroicons/react/24/outline'
import { HomeIcon as HomeOutline, PlusCircleIcon as PlusCircleOutline } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'
import { classNames } from '../../utils/utils'

type Props = {}

const IconsHome = {
	HomeSolid,
	HomeOutline,
}
const IconsAdd = {
	PlusCircleSolid,
	PlusCircleOutline,
}

const Footer: FC<Props> = () => {
	const location = useLocation()
	const isHomePage = location.pathname === '/'
	const isAddPage = location.pathname === '/new'

	const ButtonHome = IconsHome[isHomePage ? 'HomeSolid' : 'HomeOutline']
	const ButtonAdd = IconsAdd[isAddPage ? 'PlusCircleSolid' : 'PlusCircleOutline']

	return (
		<div
			className={classNames('fixed', 'py-2 flex justify-evenly bottom-0 bg-white w-full lg:border-t border-gray-200')}
		>
			<Link to="/">
				<ButtonHome
					className={classNames(isHomePage ? 'text-multigram' : 'text-gray-800', 'h-10 w-10 flex-shrink-0')}
					data-testid="link-home"
				/>
			</Link>
			<Link to="/new">
				<ButtonAdd
					className={classNames(isAddPage ? 'text-multigram' : 'text-gray-800', 'h-10 w-10 flex-shrink-0')}
					data-testid="link-add"
				/>
			</Link>
		</div>
	)
}

export default Footer
