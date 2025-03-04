import { FC, useEffect } from 'react'
import { useServiceFetch } from '../../services/useServiceFetch'
import { useSelector } from 'react-redux'
import { AppStore } from '../../store/store'
import { Card } from './'

type Props = {}

const CardContainer: FC<Props> = () => {
	const { getAllPost } = useServiceFetch()
	const multigramState = useSelector((store: AppStore) => store.multigram)

	useEffect(() => {
		getAllPost()
	}, [])

	return (
		<>
			{Array.isArray(multigramState) &&
				multigramState.map((post, index) => (
					<div key={index} className="w-full sm:w-[180px] md:w-[260px] lg:w-[300px]">
						<Card key={post.id} post={post} />
					</div>
				))}
		</>
	)
}

export default CardContainer
