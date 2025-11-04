import type { IAuthRepository } from "@/domain/repositories/IAuthRepository";

export class LogoutUseCase {
    constructor(private authRepository: IAuthRepository) {}

    execute(): Promise<void> {        

        sessionStorage.removeItem('auth_token');
        
        return Promise.resolve();
    }
}