import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tag from 'App/Models/Tag'

export default class TagsController {
  public async index() {
    const tags = await Tag.all()
    return tags
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['name', 'slug'])
    const tag = await Tag.create(data)
    return tag
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const tag = await Tag.findOrFail(params.id)
      return tag
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'tag not found' } })
    }
  }

  public async update({ params, response, request }: HttpContextContract) {
    try {
      const data = request.only(['name', 'slug'])
      const tag = await Tag.findOrFail(params.id)
      tag.merge(data)
      await tag.save()
      return tag
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'tag not found' } })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const tag = await Tag.findOrFail(params.id)
      await tag.delete()
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'tag not found' } })
    }
  }
}
