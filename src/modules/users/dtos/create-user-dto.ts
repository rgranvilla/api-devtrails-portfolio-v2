export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'creator' | 'subscriber';
}
