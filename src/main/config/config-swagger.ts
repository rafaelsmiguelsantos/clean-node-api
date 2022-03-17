import swaggerConfig from '@/main/documentation/swagger'
import { noCache } from '@/main/middlewares/no-cache'
import { serve, setup } from 'swagger-ui-express'
import { Express } from 'express'

export default (app: Express): void => {
  app.use('/api-docs', noCache,serve, setup(swaggerConfig))
}
