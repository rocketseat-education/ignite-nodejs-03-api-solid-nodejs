import { Prisma, User } from "@prisma/client";
import { PrismaUsersRepository } from "./prisma/prisma-users-repository";

export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    findByEmail(email: string): Promise<User | null>
}