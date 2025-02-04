import 'reflect-metadata'
import { container } from 'tsyringe'
import { CreatePostUseCase } from './src/application/Post/usecases/createPost'
import { PostRepository } from './src/adapter/Post/PostRepository'
import { PostController } from './src/adapter/Post/PostController'
import { GetPostsUseCase } from './src/application/Post/usecases/getPosts'
import { UpdatePostUseCase } from './src/application/Post/usecases/updatePost'

container.registerSingleton('CreatePostUseCase', CreatePostUseCase)
container.registerSingleton('UpdatePostUseCase', UpdatePostUseCase)
container.registerSingleton('GetPostsUseCase', GetPostsUseCase)
container.registerSingleton('PostRepository', PostRepository)
container.registerSingleton('PostCreateController', PostController)

export const postController = container.resolve(PostController)
