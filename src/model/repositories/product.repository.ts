import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';

export class ProductRepository extends Repository<ProductEntity> {}
