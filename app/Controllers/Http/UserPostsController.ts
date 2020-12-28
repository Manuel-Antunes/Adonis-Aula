import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class UserPostsController {
  public async index({ params }: HttpContextContract) {
    const posts = await Post.query().where('user_id', params.user_id).preload('user')
    return posts
  }
}
