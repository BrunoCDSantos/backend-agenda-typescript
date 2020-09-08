/* eslint-disable class-methods-use-this */
import { getRepository } from 'typeorm';

import People from '../models/people';
import AppError from '../errors/AppError';

interface Request {
  id: string;
  name: string;
  fone: string;
  email: string;
  file: string;
}

interface Response {
  name: string;
  fone: string;
  email: string;
  file: string;
}

class deletePeople {
  public async run({
    id,
    name,
    fone,
    email,
    file,
  }: Request): Promise<Response> {
    const peopleRepository = getRepository(People);

    const checkPeopleExists = await peopleRepository.findOne({
      where: { id },
    });

    if (!checkPeopleExists) {
      throw new AppError('People not exists', 401);
    }

    const peopleUpdate = {
      id,
      name: name || checkPeopleExists.name,
      fone: fone || checkPeopleExists.fone,
      email: email || checkPeopleExists.email,
      file: file || checkPeopleExists.file,
    };

    peopleRepository.save(peopleUpdate);

    return peopleUpdate;
  }
}

export default deletePeople;
