import { injectable, inject } from 'tsyringe';
import { ICustomersRepository } from '../domain/models/repositories/ICustomerRepository';
import { IPaginationCustomer } from '../domain/models/IPaginationCustomer';

@injectable()
class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(): Promise<IPaginationCustomer> {
    const customers = await this.customersRepository.list();
    return customers;
  }
}

export default ListCustomerService;
