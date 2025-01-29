import 'reflect-metadata'
import { container } from 'tsyringe'
import { FakePostRepository } from '../fakes/fakePostRepository'
import { PostRepositoryPort } from '../../application/Post/port/PostRepositoryPort'
import { GetPostsUseCase } from '../../application/Post/usecases/getPosts'
import { UnCaughtError } from '../../src/errors/Uncaught'

describe('Get Posts', () => {
	let postRepository: PostRepositoryPort

	beforeEach(() => {
		container.registerSingleton('PostRepository', FakePostRepository)
		postRepository = container.resolve(FakePostRepository)
	})

	it('Should get all posts', async () => {
		const getPostsUseCase = new GetPostsUseCase(postRepository)
		const posts = await getPostsUseCase.getAll()
		expect(posts).toHaveLength(1)
		expect(posts[0]).toHaveProperty('title')
		expect(posts[0]).toHaveProperty('image')
		expect(posts[0]).toHaveProperty('id')
	})

	it('Should get post by id', async () => {
		const getPostsUseCase = new GetPostsUseCase(postRepository)
		const post = await getPostsUseCase.findById('1')
		expect(post).toHaveProperty('title')
		expect(post).toHaveProperty('image')
		expect(post).toHaveProperty('id')
	})

	it('Should not find a post with a non existing id', async () => {
		const getPostsUseCase = new GetPostsUseCase(postRepository)
		await expect(getPostsUseCase.findById('2')).rejects.toThrow('Post not found')
	})

	it('Should throw an error when an unexpected error occurs', async () => {
		const getPostsUseCase = new GetPostsUseCase(postRepository)
		jest.spyOn(postRepository, 'getAll').mockImplementationOnce(() => {
			throw new UnCaughtError('Unexpected error', {})
		})
		await expect(getPostsUseCase.getAll()).rejects.toThrow('Unexpected error')
	})
})
