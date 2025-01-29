import 'reflect-metadata'
import { container } from 'tsyringe'
import { CreatePostUseCase } from './application/Post/usecases/createPost'
import { PostRepository } from './adapter/Post/PostRepository'
import { PostController } from './adapter/Post/PostController'
import { GetPostsUseCase } from './application/Post/usecases/getPosts'

container.registerSingleton('CreatePostUseCase', CreatePostUseCase)
container.registerSingleton('GetPostsUseCase', GetPostsUseCase)
container.registerSingleton('PostRepository', PostRepository)
container.registerSingleton('PostCreateController', PostController)

export const postController = container.resolve(PostController)
