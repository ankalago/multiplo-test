import 'reflect-metadata'
import { container } from 'tsyringe'
import { FakePostRepository } from '../fakes/fakePostRepository'
import { CreatePostUseCase } from '../../application/Post/usecases/createPost'
import { PostRepositoryPort } from '../../application/Post/port/PostRepositoryPort'

describe('Create Post', () => {
	let postRepository: PostRepositoryPort

	beforeEach(() => {
		container.registerSingleton('PostRepository', FakePostRepository)
		postRepository = container.resolve(FakePostRepository)
	})

	it('Should create a post', async () => {
		const createPostUseCase = new CreatePostUseCase(postRepository)
		const post = await createPostUseCase.create({
			title: 'Post 2',
			image:
				'https://images.unsplash.com/photo-1675954099294-3d31ed3cc107?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=webp&fit=crop&w=900&q=100',
		})
		expect(post).toHaveProperty('title')
		expect(post).toHaveProperty('image')
		expect(post).toHaveProperty('id')
	})

	it('Should return error when image is empty', async () => {
		const createPostUseCase = new CreatePostUseCase(postRepository)
		await expect(
			createPostUseCase.create({
				title: 'Post 2',
				image: '',
			}),
		).rejects.toThrow('Image is required')
	})

	it('Should return error when title is empty', async () => {
		const createPostUseCase = new CreatePostUseCase(postRepository)
		await expect(
			createPostUseCase.create({
				title: '',
				image:
					'https://images.unsplash.com/photo-1675954099294-3d31ed3cc107?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=webp&fit=crop&w=900&q=100',
			}),
		).rejects.toThrow('Title is required')
	})

	it('Should return error when title or image is undefined', async () => {
		const createPostUseCase = new CreatePostUseCase(postRepository)
		await expect(
			createPostUseCase.create({
				title: undefined as unknown as string,
				image: undefined as unknown as string,
			}),
		).rejects.toThrow('Title and image are required')
	})
})
