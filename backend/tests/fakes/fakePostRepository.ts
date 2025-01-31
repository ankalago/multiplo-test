import { Post } from '../../application/Post/domain/Post'
import { IPostCreateRepository, IPostUpdateRepository } from '../../application/Post/domain/IPost'

export class FakePostRepository {
	private posts: Post[] = [
		new Post(
			'title',
			'https://images.unsplash.com/photo-1675954099202-248ea9d6930e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=webp&fit=crop&w=900&q=100',
			'filterOriginal',
			'1',
			new Date(),
			false,
		),
	]
	async getAll(): Promise<Post[]> {
		return this.posts
	}
	async create(post: IPostCreateRepository): Promise<Post> {
		this.posts.push(post)
		return new Post(post.title, post.image, post.id)
	}
	async updateById(id: string, post: IPostUpdateRepository): Promise<Post | null> {
		let postData = this.posts.find((post) => post.id === id)
		if (!postData) {
			return null
		}
		let updatePost = new Post(
			postData.title,
			postData.image,
			postData.filter,
			postData.id,
			postData.createdAt,
			post.like,
		)
		this.posts.filter((post) => post.id !== id).push(updatePost)
		return updatePost
	}
	async findById(id: string) {
		let post = this.posts.find((post) => post.id === id)
		return post ? post : null
	}
}
