import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Media from 'App/Models/Media'

export default class MediaController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const upload = request.file('file', { size: '20mb' })
      const filename = `${Date.now()}.${upload?.subtype}`
      await upload?.move(Application.tmpPath('uploads'), { name: filename })
      const media = await Media.create({
        name: upload?.clientName,
        type: upload?.type,
        subtype: upload?.subtype,
        path: filename,
      })
      return media
    } catch (error) {
      return response
        .status(400)
        .send({ error: { message: `it wasn't possible to upload your file please try again` } })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const media = await Media.findOrFail(params.id)
      return response.download(Application.tmpPath(`uploads/${media.path}`))
    } catch (error) {
      return response.status(error.status).send({ error: { message: 'media not found' } })
    }
  }
}
