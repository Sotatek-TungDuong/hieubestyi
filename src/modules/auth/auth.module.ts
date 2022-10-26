import { Module } from '@nestjs/common';
import { UserRepository } from 'src/model/repositories/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/model/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
})
export class AuthModule {}
