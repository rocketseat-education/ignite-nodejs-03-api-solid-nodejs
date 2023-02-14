import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

async function run() {
  await prisma.member.create({
    data: {
      name: 'Super Admin',
      email: 'admin@example.com',
      password_hash: await hash('admin', 6),
    },
  })
}

run()
  .catch((err) => {
    console.error(err)
  })
  .finally(() => {
    prisma.$disconnect()
  })
