import 'reflect-metadata'
import { container } from 'tsyringe'
import { FakePostRepository } from '../fakes/fakePostRepository'
import { PostRepositoryPort } from '../../application/Post/port/PostRepositoryPort'
import { UpdatePostUseCase } from '../../application/Post/usecases/updatePost'

describe('Update Post', () => {
	let postRepository: PostRepositoryPort

	beforeEach(() => {
		container.registerSingleton('PostRepository', FakePostRepository)
		postRepository = container.resolve(FakePostRepository)
	})

	it('Should update the post by id', async () => {
		const updatePostUseCase = new UpdatePostUseCase(postRepository)
		const post = await updatePostUseCase.update('1', {
			like: true,
		})
		expect(post).toHaveProperty('like')
	})

	it('Should return error when post is not found', async () => {
		const updatePostUseCase = new UpdatePostUseCase(postRepository)
		await expect(
			updatePostUseCase.update('2', {
				like: true,
			}),
		).rejects.toThrow('Post not found')
	})

	it('Should return error when like is undefined', async () => {
		const updatePostUseCase = new UpdatePostUseCase(postRepository)
		await expect(
			updatePostUseCase.update('1', {
				like: undefined as unknown as boolean,
			}),
		).rejects.toThrow('Like are required')
	})
})
