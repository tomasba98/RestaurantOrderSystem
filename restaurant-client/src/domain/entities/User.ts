export interface User {
    id: string;
    userName: string;    
    email: string;
    role: Roles;
    createdAt: string;    
    updatedAt: Date;
  }

  export enum Roles {
    Admin = 0,
    Manager = 1,
    Waiter = 2,
    Kitchen = 3
  }

  export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
  }
  
  export interface AuthResponse {
    user: User;
    tokens: AuthTokens;
  }