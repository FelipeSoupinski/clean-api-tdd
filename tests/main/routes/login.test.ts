import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { Collection } from 'mongodb'
import app from '@/main/config/app'
import request from 'supertest'
import { hash } from 'bcrypt'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return 401 if invalid credentials is provided', async () => {
    await request(app)
      .post('/api/login')
      .send({
        email: 'felipe@gmail.com',
        password: '123'
      })
      .expect(401)
  })

  test('Should return 200 on login', async () => {
    const password = await hash('123', 12)
    await accountCollection.insertOne({
      name: 'Felipe',
      email: 'felipe@gmail.com',
      password
    })
    await request(app)
      .post('/api/login')
      .send({
        email: 'felipe@gmail.com',
        password: '123'
      })
      .expect(200)
  })
})
