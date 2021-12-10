import { MongoHelper } from '../mongo-helper'
import { AddAccountRepository } from '@/data/protocols'

export class AccountMongoRepository implements AddAccountRepository {
  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(data)
    return result.insertedId !== null
  }
}
