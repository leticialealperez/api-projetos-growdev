export interface CreateUserDto {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export interface SignInDto {
  username: string;
  password: string;
}
