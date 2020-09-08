/* eslint-disable class-methods-use-this */
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import auth from '../config/auth';

import User from '../models/user';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AutheticationCompanyService {
  public async run({ email, password }: Request): Promise<Response> {
    const userRepositorys = getRepository(User);
    const user = await userRepositorys.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('Incorrect email/password cobination');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password cobination');
    }

    const token = sign({}, auth.jwt.secret, {
      subject: user.id,
      expiresIn: auth.jwt.expireIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AutheticationCompanyService;
