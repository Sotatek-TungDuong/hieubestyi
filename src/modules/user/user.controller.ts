import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth';
import { UserService } from 'src/modules/user/user.service';

// GET POST PUT PATCH DELETE

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @UseGuards(AuthGuard)
  async getMe(@Req() req) {
    const data = req?.user;
    delete data?.password;
    return data;
  }
}
