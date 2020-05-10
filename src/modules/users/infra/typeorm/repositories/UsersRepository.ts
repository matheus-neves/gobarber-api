import { Repository, getRepository } from 'typeorm';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '../entities/User';

export default class UsersRepository implements IUsersRepository {
  private ormUser: Repository<User>;

  constructor() {
    this.ormUser = getRepository(User);
  }

  public async findById(user_id: string): Promise<User | undefined> {
    const user = await this.ormUser.findOne({
      where: { user_id },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormUser.findOne({
      where: { email },
    });

    return user;
  }

  public async create({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormUser.create({
      name,
      email,
      password,
    });

    await this.ormUser.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormUser.save(user);
  }
}
