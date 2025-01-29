import { IPost, IPostCreateRepository } from '../domain/IPost'
import { Optional } from '../../../src/lib/types'

export interface PostRepositoryPort {
	getAll(): Promise<IPost[] | []>
	create(post: IPostCreateRepository): Promise<IPost>
	findById(id: string): Promise<Optional<IPost>>
	delete(id: string): Promise<boolean>
}
