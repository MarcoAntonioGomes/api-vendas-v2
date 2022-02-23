import { container } from 'tsyringe';
import { ICustomersRepository } from '@modules/customers/domain/models/repositories/ICustomerRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);
