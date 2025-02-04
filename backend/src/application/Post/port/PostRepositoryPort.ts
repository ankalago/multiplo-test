import { IPost, IPostCreateRepository, IPostUpdateRepository } from '../domain/IPost'

export interface PostRepositoryPort {
	getAll(): Promise<IPost[] | []>
	create(post: IPostCreateRepository): Promise<IPost>
	findById(id: string): Promise<IPost | null>
	updateById(id: string, post: IPostUpdateRepository): Promise<IPost | null>
}
