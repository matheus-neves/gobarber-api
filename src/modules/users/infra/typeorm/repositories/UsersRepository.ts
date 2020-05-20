import { Repository, getRepository, Not } from 'typeorm';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import User from '../entities/User';

export default class UsersRepository implements IUsersRepository {
  private ormUser: Repository<User>;

  constructor() {
    this.ormUser = getRepository(User);
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let users: User[];

    if (except_user_id) {
      users = await this.ormUser.find({
        where: {
          id: Not(except_user_id),
        },
      });
    } else {
      users = await this.ormUser.find();
    }

    return users;
  }

  public async findById(user_id: string): Promise<User | undefined> {
    const user = await this.ormUser.findOne({
      where: { id: user_id },
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
