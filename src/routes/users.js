import express from 'express';
import {
  addUser,
  deleteUser,
  findUser,
  selectAllUsers,
  selectUser,
  updatePassword,
  updateUser,
} from '../controllers/users';

const usersRouter = express.Router();
usersRouter.param('userId', findUser);
usersRouter.get('/', selectAllUsers);
usersRouter.get('/:userId', selectUser);
usersRouter.post('/register', addUser);
usersRouter.put('/:userId', updateUser);
usersRouter.put('/:userId/password', updatePassword);
usersRouter.delete('/:userId', deleteUser);
export default usersRouter;
