export interface User {
    id: string;
    userName: string;
    role: Roles;
    createdAt: string;
  }

  export enum Roles {
    Admin = 0,
    Manager = 1,
    Waiter = 2,
    Kitchen = 3
  }