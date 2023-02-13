import { Member, Prisma } from '@prisma/client'

export interface MembersRepository {
  findById(id: string): Promise<Member | null>
  findByEmail(email: string): Promise<Member | null>
  create(data: Prisma.MemberUncheckedCreateInput): Promise<Member>
}
