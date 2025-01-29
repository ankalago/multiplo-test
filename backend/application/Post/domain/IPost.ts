export type PostId = string
export type PostTitle = string
export type PostImage = string

export interface IPost {
	id?: PostId
	title: PostTitle
	image: PostImage
	createdAt?: Date
}

export interface IPostCreate {
	title: PostTitle
	image: PostImage
}

export interface IPostCreateRepository extends IPostCreate {
	id: PostId
	createdAt: Date
}

export interface IPostToUI {
	id: PostId
	title: PostTitle
	image: PostImage
	createdAt: Date
}
