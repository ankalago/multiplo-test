import { setData } from '../store/states/multigram'
import { useDispatch } from 'react-redux'
import { AxiosServices } from '../lib/axiosServices'
import useSWRMutation from 'swr/mutation'
import { useEffect } from 'react'
import { IMultigram } from '../entities/multigram'

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL

export const useServiceFetch = <U extends IMultigram>() => {
	const axiosInstance = AxiosServices.getInstance()
	const dispatch = useDispatch()

	const { data: getDataPost, trigger: triggerGetDataPost } = useSWRMutation([`api/v1/post`], (key) => {
		return axiosInstance.get(`${BASE_API_URL}/${key}`)
	})

	const { data: updateDataPost, trigger: triggerUpdateDataPost } = useSWRMutation(
		[`api/v1/post`],
		(key: [string], { arg }: { arg: { id: string; like: boolean } }) => {
			return axiosInstance.patch(`${BASE_API_URL}/${key}/${arg.id}`, { like: arg.like })
		},
		{
			revalidate: true,
		},
	)

	const { data: createDataPost, trigger: triggerCreateDataPost } = useSWRMutation(
		[`api/v1/post`],
		(key: [string], { arg }: { arg: { data: IMultigram } }) => {
			return axiosInstance.post(`${BASE_API_URL}/${key}`, arg.data)
		},
		{
			revalidate: true,
		},
	)

	useEffect(() => {
		getDataPost && dispatch(setData(getDataPost))
	}, [getDataPost])

	useEffect(() => {
		triggerGetDataPost()
	}, [updateDataPost, createDataPost])

	const getAllPost = async () => {
		await triggerGetDataPost()
	}

	const createPost = async (data: U) => {
		await triggerCreateDataPost({ data })
	}

	const updatePost = async (id: string, like: boolean) => {
		await triggerUpdateDataPost({ id, like })
	}

	return { getAllPost, createPost, updatePost }
}
