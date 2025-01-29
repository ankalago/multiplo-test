import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'
import { CreatePostPort } from '../../application/Post/port/CreatePostPort'
import { IPostCreate } from '../../application/Post/domain/IPost'
import { GetPostsPort } from '../../application/Post/port/GetPostsPort'

@injectable()
export class PostController {
	constructor(
		@inject('CreatePostUseCase') private postCreate: CreatePostPort,
		@inject('GetPostsUseCase') private postGet: GetPostsPort,
	) {
		this.postCreate = postCreate
		this.postGet = postGet
	}
	async create(body: IPostCreate) {
		try {
			return await this.postCreate.create(body)
		} catch (error) {
			throw error
		}
	}
	async getAll() {
		try {
			return await this.postGet.getAll()
		} catch (error) {
			throw error
		}
	}
	async findById(id: string) {
		try {
			return await this.postGet.findById(id)
		} catch (error) {
			throw error
		}
	}
}
