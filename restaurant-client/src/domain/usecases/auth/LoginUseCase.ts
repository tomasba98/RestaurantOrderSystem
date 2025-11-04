import type { AuthResponse, IAuthRepository, LoginCredentials } from "@/domain/repositories/IAuthRepository";

export class LoginUseCase {
    constructor(private authRepository: IAuthRepository) {}
  
    async execute(credentials: LoginCredentials): Promise<AuthResponse> {
      
        
      if (!credentials.userName || !credentials.password) {
        throw new Error('El nombre de usuario y contraseña son requeridos');
      }        

      const authResponse = await this.authRepository.login(credentials);  
      
      sessionStorage.setItem('auth_token', authResponse.token);        
  
      return authResponse;
    } 
  }