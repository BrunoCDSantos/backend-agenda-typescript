/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import { getRepository } from 'typeorm';

import People from '../models/people';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  id_user: string;
  fone: string;
  email: string;
}

class createPeople {
  public async run({ name, fone, email, id_user }: Request): Promise<People> {
    const peopleRepository = getRepository(People);

    const checkPeopleExists = await peopleRepository.findOne({
      where: { email },
    });

    if (checkPeopleExists) {
      throw new AppError('Email address already used', 401);
    }

    const user = peopleRepository.save({
      name,
      email,
      fone,
      id_user,
    });

    return user;
  }
}

export default createPeople;
