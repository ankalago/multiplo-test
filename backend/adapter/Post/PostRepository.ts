import 'reflect-metadata'
import { injectable } from 'tsyringe'
import { IPostCreateRepository, IPostUpdateRepository } from '../../application/Post/domain/IPost'
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
			const newPost = await this.model.findMany()
			return newPost.map((post) => new Post(post.title, post.image, post.filter, post.id, post.createdAt, post.like))
		} catch (error: any) {
			throw new UnCaughtError(error.message, {})
		}
	}
	async create(post: IPostCreateRepository) {
		try {
			const newPost = await this.model.create({
				data: {
					id: post.id,
					title: post.title,
					image: post.image,
					filter: post.filter,
					createdAt: post.createdAt,
				},
			})
			return new Post(newPost.title, newPost.image, newPost.filter, newPost.id)
		} catch (error: any) {
			throw new UnCaughtError(error.message, 400)
		}
	}
	async findById(id: string) {
		try {
			const post = await this.model.findUnique({ where: { id: id } })
			if (post) {
				return new Post(post.title, post.image, post.filter, post.id, post.createdAt, post.like)
			}
			throw new NotFoundError('Post not found', 404)
		} catch (error: any) {
			throw new UnCaughtError(error.message, { id })
		}
	}
	async updateById(id: string, post: IPostUpdateRepository) {
		try {
			const postData = this.findById(id)
			if (!postData) {
				throw new NotFoundError('Post not found', 404)
			}
			const updatePost = await this.model.update({
				where: { id: id },
				data: post,
			})
			return new Post(
				updatePost.title,
				updatePost.image,
				updatePost.filter,
				updatePost.id,
				updatePost.createdAt,
				updatePost.like,
			)
		} catch (error: any) {
			throw new UnCaughtError(error.message, { id })
		}
	}
}
