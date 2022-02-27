import AppError from '@shared/errors/AppError';
import Order from '../infra/typeorm/entities/Order';
import { injectable, inject } from 'tsyringe';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowOrderService {
  constructor(
    @inject('OrdersRepository') private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Order> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found');
    }

    return order;
  }
}

export default ShowOrderService;
