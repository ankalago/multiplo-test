import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'
import { PostMapper } from '../../../adapter/mappers/PostMapper'
import { PostRepositoryPort } from '../port/PostRepositoryPort'
import { UnCaughtError } from '../../../src/errors/Uncaught'
import { GetPostsPort } from '../port/GetPostsPort'
import { NotFoundError } from '../../../src/errors/NotFound'

@injectable()
export class GetPostsUseCase implements GetPostsPort {
	constructor(@inject('PostRepository') private postRepository: PostRepositoryPort) {
		this.postRepository = postRepository
	}
	async getAll() {
		try {
			const posts = await this.postRepository.getAll()
			return posts.map((post) => PostMapper.toUI(post))
		} catch (error: any) {
			throw new UnCaughtError(error.message, {})
		}
	}
	async findById(id: string) {
		try {
			let post = await this.postRepository.findById(id)
			if (!post) {
				throw new NotFoundError('Post not found', { id })
			}
			return PostMapper.toUI(post)
		} catch (error: any) {
			throw new UnCaughtError(error.message, { id })
		}
	}
}
