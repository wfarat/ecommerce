/* eslint-disable consistent-return */
import bcrypt from 'bcrypt';
import Model from '../models/model';

const usersModel = new Model('users');

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
export const findUser = async (req, res) => {
  const id = req.params.userId;
  const clause = ` WHERE id='${id}'`;
  const columns = 'id, fullname, email, password';
  const data = await usersModel.select(columns, clause);
  const user = data.rows[0];
  res.status(200).send({ user });
};
