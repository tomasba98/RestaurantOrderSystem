import type { RegisterDTO, UpdateUserDTO } from "@/aplication/dto/UserDTO";
import type { User } from "../entities/User";

export interface IUserRepository{
    getAll(): Promise<User[]>;
    getById(id: string): Promise<User>;
    create(data: RegisterDTO): Promise<User>;
    update(id: string, data: UpdateUserDTO): Promise<User>;
    delete(id: string): Promise<void>;
}