import { FC } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { Outlet } from 'react-router-dom'

type Props = {}

const Layout: FC<Props> = () => {
	return (
		<>
			<Header />
			<Outlet />
			<div className="h-14" />
			<Footer />
		</>
	)
}

export default Layout
