import { FC, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { AppStore } from '../../../store/store'
import { useParams } from 'react-router-dom'
import { Card } from '../../Card'
import { useServiceFetch } from '../../../services/useServiceFetch'

type Props = {}

const Detail: FC<Props> = () => {
	const { id } = useParams()
	const { getAllPost } = useServiceFetch()
	const multiState = useSelector((store: AppStore) => store.multigram)
	const dataPost = useMemo(() => multiState.find((item) => item.id === id), [multiState, id])

	useEffect(() => {
		if (!multiState.length) {
			getAllPost()
		}
	}, [])

	if (!dataPost) {
		return null
	}

	return (
		<div className="bg-white max-w-2xl h-full mx-auto">
			<Card key={dataPost.id} post={dataPost} enableLink={false} />
		</div>
	)
}

export default Detail
