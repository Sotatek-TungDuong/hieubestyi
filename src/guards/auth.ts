import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from 'src/model/entities/user.entity';
import { UserRepository } from './../model/repositories/user.repository';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(UserEntity) private userRepo: UserRepository,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    // const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const bearerToken =
      (req.headers['Authorization'] as string) || req.headers['authorization'];
    if (!bearerToken) {
      throw new UnauthorizedException('Token is required');
    }
    const token = bearerToken.replace('Bearer ', '');
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await this.userRepo.findOne({
      where: {
        id: decoded.id,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    // if (roles && !roles.includes(user.role)) {
    //   throw new ForbiddenException('This role can not access');
    // }
    req.user = user;
    // console.log('req', req);
    return true;
  }
}
