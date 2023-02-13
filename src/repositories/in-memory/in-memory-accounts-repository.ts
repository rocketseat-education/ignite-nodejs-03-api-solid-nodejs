import { Prisma, Account } from '@prisma/client'
import { randomUUID } from 'crypto'
import { AccountsRepository } from '../accounts-repository'

export class InMemoryAccountsRepository implements AccountsRepository {
  public items: Account[] = []

  async findByEmail(email: string) {
    const account = this.items.find((item) => item.email === email)

    if (!account) {
      return null
    }

    return account
  }

  async create(data: Prisma.AccountCreateInput) {
    const account: Account = {
      ...data,
      id: data.id ?? randomUUID(),
      created_at: data.created_at ? new Date(data.created_at) : new Date(),
    }

    this.items.push(account)

    return account
  }
}
