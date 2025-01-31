import { FC } from 'react'
import { classNames } from '../../utils/utils'
import { IMultigram } from '../../entities/multigram'
import { useTimeAgo } from '../../hooks/useTimeAgo'
import { useTranslation } from 'react-i18next'
import Filter from '../Filter/Filter'
import { LikeComponent } from '../Pages/Home/styles'
import { useNavigate } from 'react-router-dom'
import { useServiceFetch } from '../../services/useServiceFetch'

type Props = {
	post: IMultigram
	enableLink?: boolean
}

const Card: FC<Props> = ({ post, enableLink = true }) => {
	const { daysTimeAgo } = useTimeAgo()
	const { updatePost } = useServiceFetch()
	const navigate = useNavigate()
	const { t } = useTranslation()
	const handleLike = async (id: string | undefined, like: boolean) => {
		await updatePost(String(id), like)
	}

	const handleClick = (id: string | undefined) => {
		navigate(`/detail/${id}`)
	}

	return (
		<div className="group relative" data-testid={`item-${post.id}`}>
			<div className="mt-4 mb-2 flex justify-between" data-testid={`item-name-${post.id}`}>
				<div>
					<h3 className="text-sm text-gray-700 font-black">
						<span aria-hidden="true" className="absolute inset-0" />
						{post.title}
					</h3>
					<p className="mt-1 text-xs text-gray-500">{`${t('texts.posted')} ${daysTimeAgo(post.createdAt)}`}</p>
				</div>
			</div>
			<div className="relative overflow-hidden bg-gray-200" data-testid={`item-image-${post.id}`}>
				<div
					className={`h-full w-full ${enableLink ? 'cursor-pointer' : ''}`}
					onClick={() => enableLink && handleClick(post.id)}
					data-testid={`wrap-image-${post.id}`}
				>
					<Filter
						filter={post.filter}
						src={post.image}
						alt={post.title}
						className="h-full w-full object-cover object-center aspect-square lg:h-full lg:w-full"
					/>
				</div>
				<div className="absolute bottom-2.5 right-2.5">
					<LikeComponent
						onClick={() => handleLike(post.id, !post.like)}
						className={classNames(
							post.like ? 'text-rose-600 like scale-110' : 'text-white unlike scale-100',
							'h-8 w-8 ease-in-out -translate-y-1 delay-150 duration-300 cursor-pointer transition-all rounded-full',
						)}
						data-testid={`icon-${post.like ? `like-${post.id}` : `unlike-${post.id}`}`}
					/>
				</div>
			</div>
		</div>
	)
}

export default Card
