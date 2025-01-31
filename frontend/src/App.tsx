import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Pages/Home'
import Add from './components/Pages/Add'
import Detail from './components/Pages/Detail'

type Props = {}

const App: FC<Props> = () => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="new" element={<Add />} />
				<Route path="detail/:id" element={<Detail />} />
			</Route>
		</Routes>
	)
}

export default App
