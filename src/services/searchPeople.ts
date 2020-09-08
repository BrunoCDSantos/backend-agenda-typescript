/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import { getRepository, Not } from 'typeorm';
import AppError from '../errors/AppError';

import People from '../models/people';

interface Request {
  except_user_id: string;
}

class searchPeople {
  public async run({ except_user_id }: Request): Promise<People[]> {
    const RepositoryPeople = getRepository(People);
    const peoples = await RepositoryPeople.find({
      where: {
        id_user: except_user_id,
      },
    });

    if (!peoples) {
      throw new AppError('People not registration', 401);
    }

    return peoples;
  }
}

export default searchPeople;
