import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
  public async index() {
    const posts = await Post.query().preload('user').preload('attachment')
    return posts
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['title', 'content', 'mediaId'])
    const post = await Post.create({ ...data, userId: request.userId })
    return post
  }

  public async show({ params, response, request }: HttpContextContract) {
    try {
      const post = await Post.findOrFail(params.id)
      await post.load('user')
      await post.load('attachment')
      return post
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'post not found' } })
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const data = request.only(['title', 'content', 'userId', 'mediaId'])
      const post = await Post.findOrFail(params.id)
      post.merge(data)
      await post.save()
      return post
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'post not found' } })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const post = await Post.findOrFail(params.id)
      await post.delete()
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'post not found' } })
    }
  }
}
