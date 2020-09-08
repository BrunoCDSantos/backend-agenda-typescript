/* eslint-disable camelcase */
import { Router } from 'express';

import CreatePeople from '../services/createPeople';
import SearchPeople from '../services/searchPeople';
import DeletePeople from '../services/deletePeople';
import UpdatePeople from '../services/updatePeople';
import userAuthetication from '../middlewares/userAuthetication';

const peopleRouter = Router();

// peopleRouter.use(userAuthetication);

peopleRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const searchPeople = new SearchPeople();

  const peoples = await searchPeople.run({
    except_user_id: id,
  });
  response.json(peoples);
});

peopleRouter.post('/:id', async (request, response) => {
  const { name, fone, email } = request.body;

  const { id } = request.params;

  const cretePeople = new CreatePeople();

  const people = await cretePeople.run({ email, fone, id_user: id, name });

  response.json(people);
});

peopleRouter.put('/:id', async (request, response) => {
  const { name, fone, email, file } = request.body;
  const { id } = request.params;

  const updatePeople = new UpdatePeople();

  const people = await updatePeople.run({ id, name, fone, email, file });

  response.json(people);
});

peopleRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const deletePeople = new DeletePeople();

  await deletePeople.run({ id });
  response.status(204).json('');
});

export default peopleRouter;
