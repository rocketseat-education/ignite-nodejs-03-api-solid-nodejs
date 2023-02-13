import { Member, Prisma } from '@prisma/client'

export interface MembersRepository {
  findByEmail(email: string): Promise<Member | null>
  create(data: Prisma.MemberCreateInput): Promise<Member>
}
