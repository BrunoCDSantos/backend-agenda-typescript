import { Router } from 'express';

import CreateUser from '../services/createUser';

const userRouter = Router();

userRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUser();

  const user = await createUser.run({
    name,
    email,
    password,
  });

  return response.json({ name: user.name, email: user.email });
});

export default userRouter;
