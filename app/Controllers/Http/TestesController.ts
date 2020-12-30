import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Teste from 'App/Schemas/Teste'

export default class TestesController {
  public async index() {
    const testes = await Teste.find()
    return testes
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['name'])
    const teste = await Teste.create({})
    return teste
  }
}
