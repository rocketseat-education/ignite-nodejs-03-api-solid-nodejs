import { Prisma, Member } from '@prisma/client'
import { randomUUID } from 'crypto'
import { MembersRepository } from '../members-repository'

export class InMemoryMembersRepository implements MembersRepository {
  public items: Member[] = []

  async findById(id: string) {
    const member = this.items.find((item) => item.id === id)

    if (!member) {
      return null
    }

    return member
  }

  async findByEmail(email: string) {
    const member = this.items.find((item) => item.email === email)

    if (!member) {
      return null
    }

    return member
  }

  async create(data: Prisma.MemberCreateInput) {
    const member: Member = {
      ...data,
      id: data.id ?? randomUUID(),
      created_at: data.created_at ? new Date(data.created_at) : new Date(),
    }

    this.items.push(member)

    return member
  }
}
