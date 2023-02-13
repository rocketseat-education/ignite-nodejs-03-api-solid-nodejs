import { beforeEach, it, describe, expect } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryMembersRepository } from '@/repositories/in-memory/in-memory-members-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let inMemoryMembersRepository: InMemoryMembersRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate', () => {
  beforeEach(() => {
    inMemoryMembersRepository = new InMemoryMembersRepository()
    authenticateUseCase = new AuthenticateUseCase(inMemoryMembersRepository)
  })

  it('should be able to authenticate', async () => {
    await inMemoryMembersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password_hash: await hash('123456', 6),
    })

    const { member } = await authenticateUseCase.execute({
      email: 'john@example.com',
      password: '123456',
    })

    expect(member.name).toEqual('John Doe')
    expect(member.id).toEqual(expect.any(String))
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
    await inMemoryMembersRepository.create({
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
