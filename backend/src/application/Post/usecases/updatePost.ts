import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'
import { IPostCreate, IPostUpdate } from '../domain/IPost'
import { Post } from '../domain/Post'
import { v4 as uuidV4 } from 'uuid'
import { PostMapper } from '../../../adapter/mappers/PostMapper'
import { PostRepositoryPort } from '../port/PostRepositoryPort'
import { CreatePostPort } from '../port/CreatePostPort'
import { UnCaughtError } from '../../../errors/Uncaught'
import { UpdatePostPort } from '../port/UpdatePostPort'
import { NotFoundError } from '../../../errors/NotFound'

@injectable()
export class UpdatePostUseCase implements UpdatePostPort {
	constructor(@inject('PostRepository') private postRepository: PostRepositoryPort) {
		this.postRepository = postRepository
	}
	async update(id: string, postUpdateData: IPostUpdate) {
		if (postUpdateData.like === undefined) {
			throw new UnCaughtError('Like are required', { postUpdateData })
		}
		try {
			let postData = await this.postRepository.findById(id)
			if (!postData) {
				throw new NotFoundError('Post not found', { id })
			}
			const post = new Post(postData.title, postData.image, postData.filter, uuidV4(), new Date(), postUpdateData.like)

			const persist = await this.postRepository.updateById(id, {
				like: post.like,
			})
			return PostMapper.toUI(persist)
		} catch (error: any) {
			throw new UnCaughtError(error.message, { postUpdateData })
		}
	}
}
