import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'
import { IPostCreate } from '../domain/IPost'
import { Post } from '../domain/Post'
import { v4 as uuidV4 } from 'uuid'
import { PostMapper } from '../../../adapter/mappers/PostMapper'
import { PostRepositoryPort } from '../port/PostRepositoryPort'
import { CreatePostPort } from '../port/CreatePostPort'
import { UnCaughtError } from '../../../errors/Uncaught'

@injectable()
export class CreatePostUseCase implements CreatePostPort {
	constructor(@inject('PostRepository') private postRepository: PostRepositoryPort) {
		this.postRepository = postRepository
	}
	async create(postCreateData: IPostCreate) {
		if (!postCreateData.title && !postCreateData.image && !postCreateData.filter) {
			throw new UnCaughtError('Title, image or filter are required', { postCreateData })
		}
		try {
			const post = new Post(postCreateData.title, postCreateData.image, postCreateData.filter, uuidV4(), new Date())

			const persist = await this.postRepository.create({
				id: post.id as string,
				title: post.title,
				image: post.image,
				filter: post.filter,
				createdAt: post.createdAt as Date,
			})
			return PostMapper.toUI(persist)
		} catch (error: any) {
			throw new UnCaughtError(error.message, { postCreateData })
		}
	}
}
