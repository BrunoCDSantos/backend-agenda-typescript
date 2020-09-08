import { Router } from 'express';
import sessionRouter from './session';
import userRouter from './user';
import peopleRouter from './people';

const routes = Router();

routes.use('/session', sessionRouter);
routes.use('/user', userRouter);
routes.use('/people', peopleRouter);

export default routes;
