import { AccountMongoRepository } from '@/infra/db/mongodb/account-repository/account'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { AddAccountModel } from '@/domain/usecases'
import { Collection } from 'mongodb'

let accountCollection: Collection

describe('Account Mongo Repository', () => {
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

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  const makeFakeAccount = (): AddAccountModel => ({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  })

  test('Should return true on add success', async () => {
    const sut = makeSut()
    const result = await sut.add(makeFakeAccount())
    expect(result).toBeTruthy()
  })

  test('Should return null if loadByEmail fails', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeFalsy()
  })

  test('Should return an account on loadByEmail success', async () => {
    const sut = makeSut()
    await accountCollection.insertOne(makeFakeAccount())
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should update the account token when updateToken success', async () => {
    const sut = makeSut()
    const res = await accountCollection.insertOne(makeFakeAccount())
    const accountId = res.insertedId
    await sut.updateToken(accountId.toString(), 'any_token')
    const account = await accountCollection.findOne({ _id: accountId })
    expect(account).toBeTruthy()
    expect(account.token).toBe('any_token')
  })
})
