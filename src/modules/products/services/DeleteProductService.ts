import redisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import cacheConfig from '@config/cache';
import { injectable, inject } from 'tsyringe';
import { IProductRepository } from '../domain/repositories/IProductRepository';
interface IRequest {
  id: string;
}

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new AppError('Product not found');
    }

    redisCache.init(cacheConfig);
    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await this.productsRepository.delete(product);
  }
}

export default DeleteProductService;
