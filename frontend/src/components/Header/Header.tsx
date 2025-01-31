import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import i18n from 'i18next'
import es from '../../assets/es.svg'
import en from '../../assets/en.svg'

type Props = {}

const Header: FC<Props> = () => {
	const [lang, setLang] = useState(i18n.language)

	const handleChangeLanguage = (lng: string) => {
		i18n.changeLanguage(lng)
		setLang(lng)
	}

	return (
		<div className="py-2 sticky top-0 z-10 bg-white border-b border-b-gray-200">
			<div className="absolute top-3 right-3 flex">
				{lang !== 'es' && (
					<img
						src={es}
						onClick={() => handleChangeLanguage('es')}
						className="grid grid-cols-2 items-center text-gray-600 font-medium cursor-pointer"
						alt="en"
						data-testid="en"
					/>
				)}
				{lang !== 'en' && (
					<img
						src={en}
						onClick={() => handleChangeLanguage('en')}
						className="grid grid-cols-2 items-center text-gray-600 font-medium cursor-pointer"
						alt="es"
						data-testid="es"
					/>
				)}
			</div>
			<Link to="/">
				<h1 className="text-4xl font-medium text-multigram font-oleo text-center">Multigram</h1>
			</Link>
		</div>
	)
}

export default Header
