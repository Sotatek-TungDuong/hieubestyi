import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequestDto, RegisterRequestDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() createUserDto: RegisterRequestDto) {
    return this.authService.register(createUserDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginRequestDto) {
    return this.authService.login(loginDto);
  }
}
