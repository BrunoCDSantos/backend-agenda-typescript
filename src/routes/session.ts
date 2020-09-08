import { Router } from 'express';
import AutheticationCompanyService from '../services/autheticationUserService';

const seesionRouter = Router();

seesionRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const autheticationCompany = new AutheticationCompanyService();

  const { user, token } = await autheticationCompany.run({
    email,
    password,
  });

  return response.json({ user, token });
});

export default seesionRouter;
