import express from 'express';
import {
  addUser,
  deleteUser,
  findUser,
  selectUser,
  updateUser,
} from '../controllers/users';

const usersRouter = express.Router();
usersRouter.param('userId', findUser);
usersRouter.get('/:userId', selectUser);
usersRouter.post('/register', addUser);
usersRouter.put('/:userId', updateUser);
usersRouter.delete('/:userId', deleteUser);
export default usersRouter;
