import express from 'express';
import { addUser, findUser } from '../controllers/users';

const usersRouter = express.Router();

usersRouter.get('/:userId', findUser);
usersRouter.post('/register', addUser);
export default usersRouter;
