import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistError } from './errors/user-already-exist-error'

// Abaixo tem uma interface, a interface é SÓ o contrato "O que o tipo 'RegisterUseCaseRequest' deve conter?""
// A função mais a baixo 'registerUseCase' recebe a implementação dessa interface, ou seja, recebe um objeto que precisa conter aquelas infos
interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

// Aqui está a função, o "caso de uso". Essa função recebe a interface acima, o "tipo", o "contrato"
// Essa função tem a logica de registro do usuario; é desacoplada do controller, ou seja, ela não ta nem ai pro http
// É uma função pura, recebe dados, processa e pronto. é isso que ela faz
// Fica claro que essa é a função de registro que será implementada em controllers que farão registro de usuarios
// O ideal é que ela seja desacoplada também do prisma, ou seja, ela nao deve saber e nem se importar com qual é o banco ou qualquer coisa assim

export class RegisterUseCase {
  constructor(
    private usersRepository: UsersRepository
  ) { }

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    // Aqui usa-se o userREpository por que ele é o responsável por se comunicar com o banco, seja uqal for
    // Ou seja, ao invés de usar o repository do banco aqui, usamos um repositorio generico
    // Esse repositorio generico DEFINE O CONTRATO, o repositorio do banco implementa esse contrato, e a função de registro usa esse contrato, ou seja, ela se importa apenas com o contrato, ela nao se importa com a implementação do banco, ela nao se importa com qual é o banco, ela so se importa com as funcoes que ela tem que ter
    // Sendo generico, ele nao se importa com qual é o banco, ele so se importa com as funcoes que ele tem que ter
    // const userRepositoy = new UsersRepository()
    const sameEmailUser = await this.usersRepository.findByEmail(email)

    if (sameEmailUser) {
      throw new UserAlreadyExistError()
    }

    const newUser = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    

    return { user: newUser };
  }
}


