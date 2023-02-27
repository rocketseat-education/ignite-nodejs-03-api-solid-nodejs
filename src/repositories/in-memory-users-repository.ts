import { Prisma } from '@prisma/client'

export class InMemoryUsersRepository {
  public users: any = []

  async create(data: Prisma.UserCreateInput) {
    this.users.push(data)
  }
}
