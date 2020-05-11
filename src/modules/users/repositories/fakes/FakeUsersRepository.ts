import { uuid } from 'uuidv4';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '../../infra/typeorm/entities/User';

export default class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(user_id: string): Promise<User | undefined> {
    const findUser = await this.users.find(user => user.id === user_id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.users.find(user => user.email === email);

    return findUser;
  }

  public async create({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), email, name, password });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const index = await this.users.findIndex(
      findUser => findUser.id === user.id,
    );

    this.users[index] = user;

    return user;
  }
}
