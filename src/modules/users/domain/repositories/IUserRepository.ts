import { ICreateUser } from '../models/ICreateUser';
import { IUser } from '../models/IUser';

export interface IUserRepository {
  findByEmail(email: string): Promise<IUser | undefined>;
  create(data: ICreateUser): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
  list(): Promise<IUser[]>;
  findById(id: string): Promise<IUser | undefined>;
}
