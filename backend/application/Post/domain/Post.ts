import { IPost, PostId, PostTitle, PostImage } from './IPost'
import { UnprocessableError } from '../../../src/errors/Unprocessable'

export class Post implements IPost {
	public id?: PostId
	public title: PostTitle
	public image: PostImage
	public createdAt?: Date

	constructor(title: PostTitle, image: PostImage, id?: string, createdAt?: Date) {
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
		this.title = title
		this.image = image
		this.createdAt = createdAt
	}
}
