import { v4 as uuidv4 } from 'uuid';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { IPaginationCustomer } from '../../models/IPaginationCustomer';

class FakeCustomersRepository implements ICustomersRepository {
  delete(customer: ICustomer): Promise<void> {
    throw new Error('Method not implemented.');
  }
  list(): Promise<IPaginationCustomer> {
    throw new Error('Method not implemented.');
  }

  private customers: Customer[] = [];

  public async create({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const customer = new Customer();
    customer.id = uuidv4();
    customer.name = name;
    customer.email = email;
    this.customers.push(customer);
    return customer;
  }

  public async save(customer: ICustomer): Promise<ICustomer> {
    const findIndex = this.customers.findIndex(
      findCustomer => findCustomer.id === customer.id,
    );

    this.customers[findIndex] = customer;
    return customer;
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.name === name);
    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.id === id);
    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.email === email);
    return customer;
  }
}

export default FakeCustomersRepository;
