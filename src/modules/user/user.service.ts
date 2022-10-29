import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/model/entities/user.entity';
import { UserRepository } from 'src/model/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private userRepo: UserRepository) {}
}
