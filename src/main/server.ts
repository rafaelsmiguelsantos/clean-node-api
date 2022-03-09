import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from '../main/env'
import 'module-alias/register'

const connectionString = env.mongoUrl
const port = env.port

MongoHelper.connect(connectionString)
  .then(async () => {
    console.log(`Mongodb connected successfully at ${connectionString}`)
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server running at http://localhost:${port}`))
  }).catch(console.error)
