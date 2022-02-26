import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IProduct } from '@modules/products/domain/models/IProduct';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';
import { Repository, In, getRepository } from 'typeorm';
import Product from '../Product';

export class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findById(id: string): Promise<IProduct | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        id,
      },
    });
    return product;
  }

  public async findByEmail(email: string): Promise<IProduct | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        email,
      },
    });
    return product;
  }

  public async create({
    name,
    quantity,
    price,
  }: ICreateProduct): Promise<IProduct> {
    const product = this.ormRepository.create({ name, quantity, price });
    await this.ormRepository.save(product);
    return product;
  }

  public async save(product: IProduct): Promise<IProduct> {
    await this.ormRepository.save(product);
    return product;
  }

  public async delete(product: IProduct): Promise<void> {
    await this.ormRepository.remove(product as Product);
  }

  public async list(): Promise<IProduct[]> {
    const products = await this.ormRepository.find();
    return products;
  }

  public async findByName(name: string): Promise<IProduct | undefined> {
    const product = this.ormRepository.findOne({
      where: {
        name,
      },
    });
    return product;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<IProduct[]> {
    const productIds = products.map(product => product.id);

    const existsProducts = await this.ormRepository.find({
      where: {
        id: In(productIds),
      },
    });

    return existsProducts;
  }
}
