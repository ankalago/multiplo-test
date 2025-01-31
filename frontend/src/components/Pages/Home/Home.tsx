import { FC } from 'react'
import { CardContainer } from '../../Card'

type Props = {}

const Home: FC<Props> = () => {
	return (
		<div className="bg-white grid">
			<div className="md:w-4xl lg:w-full sm:py-12 sm:px-6 lg:px-8 relative mx-auto">
				<div className="flex flex-wrap gap-8">
					<CardContainer />
				</div>
			</div>
		</div>
	)
}

export default Home
