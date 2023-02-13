import { Account } from '@prisma/client'
import { hash } from 'bcryptjs'
import { AccountsRepository } from '../repositories/accounts-repository'
import { AccountAlreadyExistsError } from './errors/account-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  account: Account
}

export class RegisterUseCase {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const accountWithSameEmail = await this.accountsRepository.findByEmail(
      email,
    )

    if (accountWithSameEmail) {
      throw new AccountAlreadyExistsError()
    }

    const password_hash = await hash(password, 8)

    const account = await this.accountsRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      account,
    }
  }
}
