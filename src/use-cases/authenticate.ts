import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { b } from "vitest/dist/chunks/suite.d.udJtyAgw";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

// Sempre bom esperar tipagem de entrada e saida

interface AuthenticateUseCaseRequest {
    email: string;
    password: string;
}

interface AuthenticateUseCaseResponse {
    user: User
};  

export class AuthenticateUseCase {
    constructor(private userRepository: UsersRepository) { }

    async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new InvalidCredentialsError();
        }

        const doesPasswordMatch = await compare(password, user.password_hash);

        if (!doesPasswordMatch) {
            throw new InvalidCredentialsError();
        }

        return {
            user,
        }

    }

}