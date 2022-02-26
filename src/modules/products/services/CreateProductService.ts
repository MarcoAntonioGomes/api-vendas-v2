import redisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import cacheConfig from '@config/cache';
import { injectable, inject } from 'tsyringe';
import { IProductRepository } from '../domain/repositories/IProductRepository';
import { IProduct } from '../domain/models/IProduct';
import { ICreateProduct } from '../domain/models/ICreateProduct';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductRepository,
  ) {}

  public async execute({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<IProduct> {
    const productExists = await this.productsRepository.findByName(name);
    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    redisCache.init(cacheConfig);

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    const product = this.productsRepository.create({
      name,
      price,
      quantity,
    });
    return product;
  }
}

export default CreateProductService;
