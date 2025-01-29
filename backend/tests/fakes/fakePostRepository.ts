import { Post } from '../../application/Post/domain/Post'
import { IPostCreateRepository } from '../../application/Post/domain/IPost'

export class FakePostRepository {
	private posts: Post[] = [
		new Post(
			'title',
			'https://images.unsplash.com/photo-1675954099202-248ea9d6930e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=webp&fit=crop&w=900&q=100',
			'1',
			new Date(),
		),
	]
	async getAll(): Promise<Post[]> {
		return this.posts
	}
	async create(post: IPostCreateRepository): Promise<Post> {
		this.posts.push(post)
		return new Post(post.title, post.image, post.id)
	}
	async findById(id: string) {
		let post = this.posts.find((post) => post.id === id)
		return post ? post : null
	}
}
