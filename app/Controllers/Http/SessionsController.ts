import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import jwt from 'jsonwebtoken'
import configJwt from 'Config/jwt'

export default class SessionsController {
  public async store({ request, response }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])
    try {
      const user = await User.findByOrFail('email', email)
      const equals = await user.checkPassword(password)
      if (!equals) {
        return response.status(401).send({ error: { message: 'passwords does not match' } })
      }
      return {
        id: user.id,
        name: user.name,
        token: jwt.sign({ id: user.id }, configJwt.secret, configJwt.options),
      }
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'user not found' } })
    }
  }
}
