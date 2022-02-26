import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../infra/typeorm/entities/Product';
import { ProductRepository } from '../infra/typeorm/entities/repositories/ProductsRepository';
import { injectable, inject } from 'tsyringe';
import { IProductRepository } from '../domain/repositories/IProductRepository';
import { IProduct } from '../domain/models/IProduct';

interface IRequest {
  id: string;
}

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IProduct> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new AppError('Product not found');
    }
    return product;
  }
}

export default ShowProductService;
