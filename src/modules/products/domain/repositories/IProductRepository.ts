import { ICreateProduct } from '../models/ICreateProduct';
import { IProduct } from '../models/IProduct';

export interface IProductRepository {
  findByName(name: string): Promise<IProduct | undefined>;
  findById(id: string): Promise<IProduct | undefined>;
  findByEmail(email: string): Promise<IProduct | undefined>;
  create(data: ICreateProduct): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  delete(product: IProduct): Promise<void>;
  list(): Promise<IProduct[]>;
  findAllByIds(products: IFindProducts[]): Promise<IProduct[]>;
}
