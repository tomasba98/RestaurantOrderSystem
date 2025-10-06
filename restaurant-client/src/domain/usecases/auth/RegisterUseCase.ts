import type { AuthResponse, IAuthRepository, RegisterData } from "@/domain/repositories/IAuthRepository";

export class RegisterUseCase {
    constructor(private authRepository: IAuthRepository) {}

    execute(credentials: RegisterData): Promise<AuthResponse> {
        return this.authRepository.register(credentials);
    }
}