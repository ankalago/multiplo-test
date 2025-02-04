import { IPostUpdate, IPostUpdateRepository } from '../domain/IPost'

export interface UpdatePostPort {
	update(id: string, post: IPostUpdate): Promise<IPostUpdateRepository>
}
