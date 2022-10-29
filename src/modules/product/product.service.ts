import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/model/entities/product.entity';
import { ProductRepository } from 'src/model/repositories/product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity) private productRepo: ProductRepository,
  ) {}

  async getPhone(): Promise<ProductEntity[]> {
    const phone = await this.productRepo.find({
      where: {
        category: 'phone',
      },
    });

    return phone;
  }

  async getAccessary(): Promise<ProductEntity[]> {
    const accessary = await this.productRepo.find({
      where: {
        category: 'accessary',
      },
    });

    return accessary;
  }
}
