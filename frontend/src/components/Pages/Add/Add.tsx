import { FC, useState } from 'react'
import { IMAGE_FALLBACK } from '../../../constants'
import { classNames } from '../../../utils/utils'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FilterImage, IMultigram } from '../../../entities/multigram'
import Input from '../../Input'
import Filters from '../../Filters'
import { useNavigate } from 'react-router-dom'
import { WrapperFilterImage } from './styles'
import { useTranslation } from 'react-i18next'
import { useServiceFetch } from '../../../services/useServiceFetch'

type Props = {}

const Add: FC<Props> = () => {
	const [imagePath, setImagePath] = useState<string>(IMAGE_FALLBACK)
	const [imageName, setImageName] = useState<string>('')
	const [imageFilter, setImageFilter] = useState<FilterImage>('filterOriginal')
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<IMultigram>()
	const { createPost } = useServiceFetch()
	const navigate = useNavigate()
	const { t } = useTranslation()

	const onSubmit: SubmitHandler<IMultigram> = async (data) => {
		await createPost(data)
		navigate('/')
	}

	register('title', { required: true })
	register('image', { required: true })
	register('filter', { value: 'filterOriginal' })
	register('like', { value: false })
	register('createdAt', { value: new Date().getTime() })

	const handleChangeInput = (name: keyof IMultigram, value: string) => {
		setValue(name, value)
		if (name === 'image') {
			setImagePath(value || IMAGE_FALLBACK)
		} else {
			setImageName(value)
		}
	}

	const handleChangeFilter = (name: keyof IMultigram, value: FilterImage) => {
		setImageFilter(value)
		setValue(name, value)
	}

	return (
		<div className="bg-white grid max-w-lg mx-auto">
			<form className="grid" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
				<div className="p-2">
					<Input
						placeholder={t('labels.image') as string}
						name="image"
						className={classNames(errors?.image ? 'border-red-500' : 'border-gray-300')}
						classNameLabel="block text-sm font-medium text-gray-500 text-center"
						setValue={handleChangeInput}
						data-testid="image"
					/>
				</div>
				<div className="bg-black aspect-w-1 aspect-h-1">
					<div className="w-full h-full">
						<WrapperFilterImage
							src={imagePath}
							alt={imageName}
							className={classNames(
								imageFilter,
								'h-full w-auto object-cover object-center mx-auto block transition-all duration-1000 ease-in-out aspect-square',
							)}
						/>
					</div>
				</div>
				<div className="p-2">
					<Input
						name="title"
						placeholder={t('labels.name') as string}
						className={classNames(errors?.title ? 'border-red-500' : 'border-gray-300')}
						classNameLabel="block text-sm font-medium text-gray-500 text-center"
						setValue={handleChangeInput}
						data-testid="title"
					/>
				</div>
				<div className="p-2 bg-white overflow-x-auto whitespace-nowrap">
					<Filters name={imageName} src={imagePath} filter={imageFilter} setValue={handleChangeFilter} />
				</div>
				<div className="p-2">
					<button
						type="submit"
						id="submit"
						className="w-full inline-flex justify-center rounded-sm border border-transparent bg-multigram py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-multigram focus:ring-offset-2 focus:cursor-pointer"
						data-testid="submit"
					>
						{t('labels.button') as string}
					</button>
				</div>
			</form>
		</div>
	)
}

export default Add
