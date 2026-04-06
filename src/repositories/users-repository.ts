import { Prisma, User } from "@prisma/client";
import { PrismaUsersRepository } from "./prisma/prisma-users-repository";

export interface CreateUserDTO {
    id?: string
    name: string
    email: string
    password_hash: string
}

export interface UsersRepository {
    findById(id: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    create(data: Prisma.UserCreateInput): Promise<User>
}