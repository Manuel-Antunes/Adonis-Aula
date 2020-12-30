import { ConnectOptions } from 'mongoose'
import Env from '@ioc:Adonis/Core/Env'

interface MongoConfig {
  url: string
  config: ConnectOptions
}

const mongoConfig: MongoConfig = {
  url: Env.get('MONGO_URL'),
  config: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  },
}

export default mongoConfig
