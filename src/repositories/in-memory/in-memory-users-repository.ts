import { CreateUserDTO, UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
    public items: any[] = []

    async findById(id: string) {
        const user = this.items.find(item => item.id === id)

        if (!user) {
            return null
        }

        return user
    }

    async findByEmail(email: string) {
        const user = this.items.find(item => item.email === email)

        if (!user) {
            return null
        }

        return user
    }

    async create(data: CreateUserDTO) {
        const users = {
            id: 'user-1',
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date(),
        }

        this.items.push(users)

        return users
    }
} 