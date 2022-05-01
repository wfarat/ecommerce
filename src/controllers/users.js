/* eslint-disable consistent-return */
import bcrypt from 'bcrypt';
import Model from '../models/model';

const usersModel = new Model('users');

const findById = async (id) => {
  const clause = ` WHERE id='${id}'`;
  const columns = 'id, fullname, email, password';
  const data = await usersModel.select(columns, clause);
  const user = data.rows[0];
  return user;
};
export const findUser = async (req, res, next, userId) => {
  const user = await findById(userId);
  if (!user) {
    res.status(404).send({ message: `User id ${userId} doesn't exist` });
  } else {
    req.user = user;
    next();
  }
};

export const addUser = async (req, res, next) => {
  const { email, password, fullname } = req.body;
  const columns = 'email, password, fullname';
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) {
        return next(err);
      }
      const values = `'${email}', '${hash}','${fullname}'`;
      const user = await usersModel.insertWithReturn(columns, values);
      res.status(200).send({ user: user.rows[0] });
    });
  });
};
export const selectUser = async (req, res) => {
  res.status(200).send({ user: req.user });
};

export const updateUser = async (req, res) => {
  const { email, fullname } = req.body;
  const clause = `id = ${req.user.id}`;
  if (req.user.email !== email) {
    await usersModel.update('email', email, clause);
  }
  if (req.user.fullname !== fullname) {
    await usersModel.update('fullname', fullname, clause);
  }
  const updatedUser = await findById(req.user.id);
  res.status(200).send({ user: updatedUser });
};

export const deleteUser = async (req, res) => {
  await usersModel.delete(`id = ${req.user.id}`);
  res
    .status(200)
    .send({ message: `User id ${req.user.id} is successfuly deleted.` });
};
