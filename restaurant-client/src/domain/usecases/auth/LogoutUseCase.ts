import type { IAuthRepository } from "@/domain/repositories/IAuthRepository";

export class LogoutUseCase {
    constructor(private authRepository: IAuthRepository) {}

    execute(): Promise<void> {
        
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');

        //return this.authRepository.logout();
        return Promise.resolve();
    }
}