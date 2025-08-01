export interface User {
  $id: string;
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface AuthUser {
  $id: string;
  name: string;
  email: string;
  emailVerification: boolean;
  status: boolean;
  registration: string;
}
