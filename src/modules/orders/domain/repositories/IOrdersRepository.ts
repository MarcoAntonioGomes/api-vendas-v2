import { IOrder } from '../models/IOrder';
import { IOrderReady } from '../models/IOrderReady';

export interface IOrdersRepository {
  findById(id: string): Promise<IOrder | undefined>;
  createOrder({ customer, products }: IOrderReady): Promise<IOrder>;
}
