import { Member } from '@prisma/client'
import { hash } from 'bcryptjs'
import { MembersRepository } from '@/repositories/members-repository'
import { MemberAlreadyExistsError } from './errors/member-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  member: Member
}

export class RegisterUseCase {
  constructor(private membersRepository: MembersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const memberWithSameEmail = await this.membersRepository.findByEmail(email)

    if (memberWithSameEmail) {
      throw new MemberAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const member = await this.membersRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      member,
    }
  }
}
