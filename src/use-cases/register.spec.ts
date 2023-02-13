import { beforeEach, it, describe, expect } from 'vitest'
import { compare } from 'bcryptjs'
import { InMemoryMembersRepository } from '@/repositories/in-memory/in-memory-members-repository'
import { RegisterUseCase } from './register'
import { MemberAlreadyExistsError } from './errors/member-already-exists-error'

let inMemoryMembersRepository: InMemoryMembersRepository
let registerUseCase: RegisterUseCase

describe('Register', () => {
  beforeEach(() => {
    inMemoryMembersRepository = new InMemoryMembersRepository()
    registerUseCase = new RegisterUseCase(inMemoryMembersRepository)
  })

  it('should be able to register', async () => {
    const { member } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    })

    expect(member.name).toEqual('John Doe')
    expect(member.id).toEqual(expect.any(String))
  })

  it('should hash user password on registration', async () => {
    const password = '123456'

    const { member } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password,
    })

    const isPasswordCorrectlyHashed = await compare(
      password,
      member.password_hash,
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
    }).rejects.toBeInstanceOf(MemberAlreadyExistsError)
  })
})
