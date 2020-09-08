/* eslint-disable class-methods-use-this */
import { getRepository } from 'typeorm';

import People from '../models/people';
import AppError from '../errors/AppError';

interface Request {
  id: string;
}

class deletePeople {
  public async run({ id }: Request): Promise<void> {
    const peopleRepository = getRepository(People);

    const checkPeopleExists = await peopleRepository.findOne({
      where: { id },
    });

    if (!checkPeopleExists) {
      throw new AppError('People not exists', 401);
    }

    peopleRepository.delete(checkPeopleExists);
  }
}

export default deletePeople;
