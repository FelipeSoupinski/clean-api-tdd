import { AddAccountRepository, LoadAccountByEmailRepository, UpdateTokenRepository } from '@/data/protocols'
import { AccountModel } from '@/domain/models'
import { MongoHelper } from '../mongo-helper'
import { ObjectId } from 'mongodb'

export class AccountMongoRepository implements AddAccountRepository,
  LoadAccountByEmailRepository, UpdateTokenRepository {
  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(data)
    return result.insertedId !== null
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async updateToken (id: string, token: string): Promise<void> {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          token
        }
      })
  }
}
