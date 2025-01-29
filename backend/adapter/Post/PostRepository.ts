import 'reflect-metadata'
import { injectable } from 'tsyringe'
import { IPostCreateRepository } from '../../application/Post/domain/IPost'
import { Post } from '../../application/Post/domain/Post'
import { PrismaClient } from '@prisma/client'
import { PostRepositoryPort } from '../../application/Post/port/PostRepositoryPort'
import db from '../../src/infrastructure/db/db'
import { UnCaughtError } from '../../src/errors/Uncaught'
import { NotFoundError } from '../../src/errors/NotFound'

@injectable()
export class PostRepository implements PostRepositoryPort {
	private db: PrismaClient
	private model: typeof db.post
	constructor() {
		this.db = db
		this.model = this.db.post
	}
	async getAll() {
		try {
			let newPost = await this.model.findMany()
			return newPost.map((post) => new Post(post.title, post.image, post.id, post.createdAt))
		} catch (error: any) {
			throw new UnCaughtError(error.message, {})
		}
	}
	async create(post: IPostCreateRepository) {
		try {
			let newPost = await this.model.create({
				data: {
					id: post.id,
					title: post.title,
					image: post.image,
					createdAt: post.createdAt,
				},
			})
			return new Post(newPost.title, newPost.image, newPost.id)
		} catch (error: any) {
			throw new UnCaughtError(error.message, 400)
		}
	}
	async findById(id: string) {
		try {
			let post = await this.model.findUnique({ where: { id: id } })
			if (post) {
				return new Post(post.title, post.image, post.id)
			}
			throw new NotFoundError('post not found', 404)
		} catch (error: any) {
			throw new UnCaughtError(error.message, { id })
		}
	}
	async delete(id: string) {
		try {
			let post = await this.model.delete({ where: { id: id } })
			if (!post) {
				throw new NotFoundError('post not found', 404)
			}
			return true
		} catch (error: any) {
			throw new UnCaughtError(error.message, { id })
		}
	}
}
