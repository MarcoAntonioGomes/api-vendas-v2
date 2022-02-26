import { container } from 'tsyringe';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { ProductRepository } from '@modules/products/infra/typeorm/entities/repositories/ProductsRepository';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.registerSingleton<IProductRepository>(
  'ProductsRepository',
  ProductRepository,
);
