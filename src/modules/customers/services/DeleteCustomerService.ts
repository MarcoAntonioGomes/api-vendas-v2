import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { ICustomersRepository } from '../domain/repositories/ICustomerRepository';
interface IRequest {
  id: string;
}

@injectable()
class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const customer = await this.customersRepository.findById(id);
    if (!customer) {
      throw new AppError('Customer not found.');
    }
    await this.customersRepository.delete(customer);
  }
}

export default DeleteCustomerService;
