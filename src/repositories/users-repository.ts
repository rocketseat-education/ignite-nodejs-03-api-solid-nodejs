import { User, UserInsert } from '@/lib/drizzle/schema'

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: UserInsert): Promise<User>
}
