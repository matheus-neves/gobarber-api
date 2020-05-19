import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    console.log(user_id);
    const user = await this.usersRepository.findById(user_id);

    console.log(user);

    if (!user) {
      throw new AppError({ message: 'User not found' });
    }

    return user;
  }
}

export default ShowProfileService;