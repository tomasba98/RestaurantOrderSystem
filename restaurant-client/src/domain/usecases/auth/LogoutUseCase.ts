import type { IAuthRepository } from "@/domain/repositories/IAuthRepository";

export class LogoutUseCase {
    constructor(private authRepository: IAuthRepository) {}

    execute(): Promise<void> {
        return this.authRepository.logout();
    }
}