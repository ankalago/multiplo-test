import { IPostToUI } from '../../application/Post/domain/IPost'

export class PostMapper {
	static toUI(post: any): IPostToUI {
		return {
			id: post.id as string,
			title: post.title,
			image: post.image,
			filter: post.filter,
			like: post.like,
			createdAt: post.createdAt,
		}
	}
}
