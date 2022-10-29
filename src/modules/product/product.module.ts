import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/model/entities/product.entity';
import { UserEntity } from 'src/model/entities/user.entity';
import { ProductRepository } from 'src/model/repositories/product.repository';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProductEntity])],
  exports: [ProductService],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
