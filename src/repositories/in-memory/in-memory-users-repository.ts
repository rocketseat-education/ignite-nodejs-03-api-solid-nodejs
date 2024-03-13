import { UsersRepository } from '@/repositories/users-repository'
import { randomUUID } from 'node:crypto'

import { User, UserInsert } from '@/lib/drizzle/schema'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: UserInsert) {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
      role: data.role ?? 'MEMBER',
    }

    this.items.push(user)

    return user
  }
}
