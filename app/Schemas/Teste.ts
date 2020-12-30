import Mongo from '@ioc:Adonis/Addons/Mongo'
interface TesteTypes extends Mongo.Document {
  name: string
}
const TesteSchema = new Mongo.Schema<TesteTypes>(
  {
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export default Mongo.model('Teste', TesteSchema)
