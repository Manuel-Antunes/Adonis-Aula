import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostTagsController {
  public async index({ params, response }: HttpContextContract) {
    try {
      const post = await Post.findOrFail(params.post_id)
      const tags = await post.related('tags').query()
      return tags
    } catch (error) {
      console.log(error)
      return response.status(error.status).send({ error: { message: 'post not found' } })
    }
  }

  public async store({ params, request, response }: HttpContextContract) {
    try {
      const tagId = request.input('tagId')
      const post = await Post.findOrFail(params.post_id)
      await post.related('tags').attach([tagId])
      return { ok: 'tag successfully attached' }
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'post not found' } })
    }
  }
}
