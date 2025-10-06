import type { AuthResponse, IAuthRepository, LoginCredentials } from "@/domain/repositories/IAuthRepository";

export class LoginUseCase {
    constructor(private authRepository: IAuthRepository) {}

    execute(credentials: LoginCredentials): Promise<AuthResponse> {
        return this.authRepository.login(credentials);
    }
}