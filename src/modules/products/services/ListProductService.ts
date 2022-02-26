import redisCache from '@shared/cache/RedisCache';
import cacheConfig from '@config/cache';
import { injectable, inject } from 'tsyringe';
import { IProductRepository } from '../domain/repositories/IProductRepository';
import { IProduct } from '../domain/models/IProduct';

@injectable()
class ListProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductRepository,
  ) {}

  public async execute(): Promise<IProduct[]> {
    redisCache.init(cacheConfig);

    let products = await redisCache.recover<IProduct[]>(
      'api-vendas-PRODUCT_LIST',
    );

    if (!products) {
      products = await this.productsRepository.list();
      await redisCache.save('api-vendas-PRODUCT_LIST', products);
    }

    return products;
  }
}

export default ListProductService;
