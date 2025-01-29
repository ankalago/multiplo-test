import { IPost } from '../domain/IPost'

export interface GetPostsPort {
	getAll(): Promise<IPost[] | null>
	findById(id: string): Promise<IPost | null>
}
