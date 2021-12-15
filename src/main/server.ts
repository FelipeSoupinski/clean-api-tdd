import { MongoHelper } from '../infra/db/mongodb/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server running at htpp://localhost:${env.port}`))
  })
  .catch(console.error)