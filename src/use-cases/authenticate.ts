import { compare } from 'bcryptjs'
import { MembersRepository } from '@/repositories/members-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { Member } from '@prisma/client'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  member: Member
}

export class AuthenticateUseCase {
  constructor(private membersRepository: MembersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const member = await this.membersRepository.findByEmail(email)

    if (!member) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, member.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      member,
    }
  }
}
