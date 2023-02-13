import { compare } from 'bcryptjs'
import { AccountsRepository } from '../repositories/accounts-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { Account } from '@prisma/client'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  account: Account
}

export class AuthenticateUseCase {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const account = await this.accountsRepository.findByEmail(email)

    if (!account) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, account.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      account,
    }
  }
}
