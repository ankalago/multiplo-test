import { IPostCreate, IPostCreateRepository } from '../domain/IPost'

export interface CreatePostPort {
	create(post: IPostCreate): Promise<IPostCreateRepository>
}
