/* eslint-disable class-methods-use-this */
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/user';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  password: string;
  email: string;
}

class createUser {
  public async run({ name, password, email }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const hashedPassword = await hash(password, 8);

    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used', 401);
    }

    const user = userRepository.save({
      name,
      password: hashedPassword,
      email,
    });

    return user;
  }
}

export default createUser;
