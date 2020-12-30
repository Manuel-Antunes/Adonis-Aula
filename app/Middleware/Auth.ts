import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken'
import jwtConfig from 'Config/jwt'
import { promisify } from 'util'

export default class Auth {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    if (request.headers().authorization) {
      try {
        const [, token] = request.headers().authorization?.split(' ') as string[]
        try {
          const newToken = (await promisify(jwt.verify)) as any
          const decoded = await newToken(token, jwtConfig.secret)
          request.userId = decoded.id
          next()
        } catch (error) {
          return response.status(401).send({ error: { message: 'token invalid' } })
        }
        await next()
      } catch (error) {
        return response.status(401).send({ error: { message: 'token bad formatted' } })
      }
    } else {
      return response.status(401).send({ error: { message: 'you must be logged in' } })
    }
  }
}
