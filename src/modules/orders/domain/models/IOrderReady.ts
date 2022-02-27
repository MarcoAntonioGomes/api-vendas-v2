import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { IProductReadyToOrder } from './IProductReadyToOrder';

export interface IOrderReady {
  customer: Customer;
  products: IProductReadyToOrder[];
}
