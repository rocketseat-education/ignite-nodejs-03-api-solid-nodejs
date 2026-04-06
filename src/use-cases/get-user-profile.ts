import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFound } from "./errors/resource-not-found";

// Sempre bom esperar tipagem de entrada e saida

interface GetUserProfileUseCaseRequest {
    userId: string;
}

interface GetUserProfileUseCaseResponse {
    user: User
};  

export class GetUserProfileUseCase {
    constructor(private userRepository: UsersRepository) { }

    async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new ResourceNotFound();
        }

        return {
            user,
        }

    }

}