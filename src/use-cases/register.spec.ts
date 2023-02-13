import { beforeEach, it, describe, expect } from 'vitest'
import { compare } from 'bcrypt'
import { InMemoryAccountsRepository } from '../repositories/in-memory/in-memory-accounts-repository'
import { RegisterUseCase } from './register'
import { AccountAlreadyExistsError } from './errors/account-already-exists-error'

let inMemoryAccountsRepository: InMemoryAccountsRepository
let registerUseCase: RegisterUseCase

describe('Register', () => {
  beforeEach(() => {
    inMemoryAccountsRepository = new InMemoryAccountsRepository()
    registerUseCase = new RegisterUseCase(inMemoryAccountsRepository)
  })

  it('should be able to register', async () => {
    const { account } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    })

    expect(account.name).toEqual('John Doe')
    expect(account.id).toEqual(expect.any(String))
  })

  it('should hash user password on registration', async () => {
    const password = '123456'

    const { account } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password,
    })

    const isPasswordCorrectlyHashed = await compare(
      password,
      account.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'john@example.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    expect(() => {
      return registerUseCase.execute({
        name: 'John Doe',
        email,
        password: '123456',
      })
    }).rejects.toBeInstanceOf(AccountAlreadyExistsError)
  })
})
