import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import env from '@/main/env'
import 'module-alias/register'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    console.log(`Mongodb connected successfully at ${env.mongoUrl}`)
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  })
  .catch(console.error)
