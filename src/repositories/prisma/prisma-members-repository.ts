import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { MembersRepository } from '../members-repository'

export class PrismaMembersRepository implements MembersRepository {
  async findById(id: string) {
    const member = await prisma.member.findUnique({
      where: {
        id,
      },
    })

    if (!member) {
      return null
    }

    return member
  }

  async findByEmail(email: string) {
    const member = await prisma.member.findUnique({
      where: {
        email,
      },
    })

    if (!member) {
      return null
    }

    return member
  }

  async create(data: Prisma.MemberCreateInput) {
    const member = await prisma.member.create({
      data,
    })

    return member
  }
}
