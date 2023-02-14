import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function makeMember(
  data?: Partial<Prisma.MemberUncheckedCreateInput>,
) {
  const member = await prisma.member.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      password_hash: 'some_hash',
      ...data,
    },
  })

  return member
}
