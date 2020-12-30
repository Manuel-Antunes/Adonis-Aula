import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
export default class UsersController {
  public async index() {
    const users = await User.all()
    return users
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['email', 'password', 'name'])
    const user = await User.create(data)
    return user
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)
      return user
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'user not found' } })
    }
  }

  public async update({ params, response, request }: HttpContextContract) {
    try {
      const data = request.only(['email', 'password', 'name'])
      const user = await User.findOrFail(params.id)
      user.merge(data)
      await user.save()
      return user
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'user not found' } })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'user not found' } })
    }
  }
}
