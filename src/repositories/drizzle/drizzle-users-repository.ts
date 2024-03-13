import { db } from '@/lib/drizzle/connection'
import { UserInsert, users } from '@/lib/drizzle/schema'
import { UsersRepository } from '@/repositories/users-repository'

export class DrizzleUsersRepository implements UsersRepository {
  async findById(id: string) {
    const user = await db.query.users.findFirst({
      where: (fields, { eq }) => {
        return eq(fields.id, id)
      },
    })

    if (!user) return null

    return user
  }

  async findByEmail(email: string) {
    const user = await db.query.users.findFirst({
      where: (fields, { eq }) => {
        return eq(fields.email, email)
      },
    })

    if (!user) return null

    return user
  }

  async create(data: UserInsert) {
    const [user] = await db.insert(users).values(data).returning()

    return user
  }
}
