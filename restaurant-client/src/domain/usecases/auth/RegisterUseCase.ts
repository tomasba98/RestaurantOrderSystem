import type { AuthResponse, IAuthRepository, RegisterData } from "@/domain/repositories/IAuthRepository";

export class RegisterUseCase {
    constructor(private authRepository: IAuthRepository) {}

    execute(credentials: RegisterData): Promise<AuthResponse> {

        if (!credentials.userName || !credentials.password) {
            throw new Error('El nombre de usuario y contraseña son requeridos');
          }

        if (!this.isValidEmail(credentials.email)) {
            throw new Error('Email inválido');
          }

        return this.authRepository.register(credentials);
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
}