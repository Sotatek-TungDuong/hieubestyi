import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from 'src/model/entities/user.entity';
import { UserRepository } from 'src/model/repositories/user.repository';
import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
} from './auth.dto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserEntity) private userRepo: UserRepository) {}

  async register(createUserDto: RegisterRequestDto): Promise<any> {
    const isExist = await this.userRepo.findOne({
      where: {
        userName: createUserDto.userName,
      },
    });

    if (isExist) {
      throw new BadRequestException('User is existed');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
    const user = await this.userRepo.save({
      userName: createUserDto.userName,
      password: hashedPassword,
    });

    console.log('first', user);

    return { message: 'success' };
  }

  async login(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.userRepo.findOne({
      where: {
        userName: loginDto.userName,
      },
    });
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    if (!(await bcrypt.compare(loginDto.password, user.password))) {
      throw new BadRequestException('Wrong password');
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_KEY,
      {
        expiresIn: '30d',
      },
    );
    return { token, refreshToken };
  }
}
