import type { User } from "../entities/User";

export interface CreateUserData{
    userName: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: number;
}

export interface UpdateUserData{
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
    role: number;
}

export interface IUserRepository{
    getAll(): Promise<User[]>;
    getById(id: string): Promise<User>;
    create(data: CreateUserData): Promise<User>;
    update(id: string, data: UpdateUserData): Promise<User>;
    delete(id: string): Promise<void>;
}