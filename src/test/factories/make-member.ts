import { prisma } from '@/lib/prisma'

export async function makeMember() {
  const member = await prisma.member.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      password_hash: 'some_hash',
    },
  })

  return member
}
