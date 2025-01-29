import { IPost, IPostToUI } from '../../application/Post/domain/IPost'

export class PostMapper {
	static toDto(post: IPost) {
		return {
			id: post.id,
			title: post.title,
			image: post.image,
		}
	}
	static toDomain(post: any) {
		return {
			id: post.id,
			title: post.title,
			image: post.image,
		}
	}
	static toUI(post: any): IPostToUI {
		return {
			id: post.id as string,
			title: post.title,
			image: post.image,
			createdAt: post.createdAt,
		}
	}
	static toPersistence(post: IPost) {
		return {
			id: post.id,
			title: post.title,
			image: post.image,
		}
	}
}
