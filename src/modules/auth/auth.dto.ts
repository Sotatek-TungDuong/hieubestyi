export class LoginRequestDto {
  userName: string;

  password: string;
}

export class LoginResponseDto {
  token: string;

  refreshToken: string;
}

export class RegisterRequestDto {
  userName: string;

  password: string;
}
