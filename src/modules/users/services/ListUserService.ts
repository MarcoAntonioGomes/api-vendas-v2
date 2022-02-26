import { injectable, inject } from 'tsyringe';
import { IUser } from '../domain/models/IUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';

@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUserRepository,
  ) {}

  public async execute(): Promise<IUser[]> {
    const users = this.usersRepository.list();
    return users;
  }
}

export default ListUserService;
