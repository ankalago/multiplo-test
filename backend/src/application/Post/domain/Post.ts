import { IPost, PostId, PostTitle, PostImage, PostLike, PostFilter } from './IPost'
import { UnprocessableError } from '../../../errors/Unprocessable'

export class Post implements IPost {
	public id?: PostId
	public title: PostTitle
	public image: PostImage
	public filter: PostFilter
	public like?: PostLike
	public createdAt?: Date

	constructor(title: PostTitle, image: PostImage, filter: PostFilter, id?: string, createdAt?: Date, like?: PostLike) {
		if (id) {
			this.id = id
		}
		if (createdAt) {
			this.createdAt = createdAt
		}
		if (title.length < 5) {
			throw new UnprocessableError('Title is required', { title })
		}
		if (image.length < 10) {
			throw new UnprocessableError('Image is required', { image })
		}
		if (filter.length < 10) {
			throw new UnprocessableError('Filter is required', { filter })
		}
		this.title = title
		this.image = image
		this.like = like
		this.filter = filter
		this.createdAt = createdAt
	}
}
