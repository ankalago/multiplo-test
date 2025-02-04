export type PostId = string
export type PostTitle = string
export type PostImage = string
export type PostLike = boolean
export type PostFilter = string

export interface IPost {
	id?: PostId
	title: PostTitle
	image: PostImage
	filter: PostFilter
	like?: PostLike
	createdAt?: Date
}

export interface IPostCreate {
	title: PostTitle
	image: PostImage
	filter: PostFilter
}

export interface IPostUpdate {
	title?: PostTitle
	image?: PostImage
	filter?: PostFilter
	like?: PostLike
}

export interface IPostCreateRepository extends IPostCreate {
	id: PostId
	createdAt: Date
}

export interface IPostUpdateRepository extends IPostUpdate {}

export interface IPostToUI {
	id: PostId
	title: PostTitle
	image: PostImage
	like: PostLike
	filter: PostFilter
	createdAt: Date
}
