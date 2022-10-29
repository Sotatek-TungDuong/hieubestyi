import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './model/entities/product.entity';
import { UserEntity } from './model/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';

export const Modules = [
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: 'hieubestyi',
    entities: [UserEntity, ProductEntity],
    synchronize: true,
    // logging: ['query'],
  }),
  AuthModule,
  UserModule,
  ProductModule,
];
