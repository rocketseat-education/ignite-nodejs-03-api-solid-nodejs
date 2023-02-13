import { beforeEach, it, describe, expect } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryAccountsRepository } from '../repositories/in-memory/in-memory-accounts-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let inMemoryAccountsRepository: InMemoryAccountsRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate', () => {
  beforeEach(() => {
    inMemoryAccountsRepository = new InMemoryAccountsRepository()
    authenticateUseCase = new AuthenticateUseCase(inMemoryAccountsRepository)
  })

  it('should be able to authenticate', async () => {
    await inMemoryAccountsRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password_hash: await hash('123456', 6),
    })

    const { account } = await authenticateUseCase.execute({
      email: 'john@example.com',
      password: '123456',
    })

    expect(account.name).toEqual('John Doe')
    expect(account.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with invalid email', async () => {
    expect(() => {
      return authenticateUseCase.execute({
        email: 'non-existent@email.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await inMemoryAccountsRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password_hash: await hash('123456', 6),
    })

    expect(
      authenticateUseCase.execute({
        email: 'john@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
