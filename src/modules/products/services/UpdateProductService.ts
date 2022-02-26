import redisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import cacheConfig from '@config/cache';
import { injectable, inject } from 'tsyringe';
import { IProductRepository } from '../domain/repositories/IProductRepository';
import { IProduct } from '../domain/models/IProduct';

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductRepository,
  ) {}

  public async execute({
    id,
    name,
    price,
    quantity,
  }: IUpdateProduct): Promise<IProduct> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    const productExists = await this.productsRepository.findByName(name);
    if (productExists && name !== product.name) {
      throw new AppError('There is already one product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    redisCache.init(cacheConfig);

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await this.productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
