import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { AccountsRepository } from '../accounts-repository'

export class PrismaAccountsRepository implements AccountsRepository {
  async findByEmail(email: string) {
    const account = await prisma.account.findUnique({
      where: {
        email,
      },
    })

    if (!account) {
      return null
    }

    return account
  }

  async create(data: Prisma.AccountCreateInput) {
    const account = await prisma.account.create({
      data,
    })

    return account
  }
}
