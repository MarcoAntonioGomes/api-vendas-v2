import { IProductToOrder } from './IProductToOrder';

export interface ICreateOrder {
  customer_id: string;
  products: IProductToOrder[];
}
