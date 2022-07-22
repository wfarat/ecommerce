import bcrypt from 'bcrypt';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import express from 'express';
import Model from '../models/model';

const usersModel = new Model('users');
const authRouter = express.Router();

authRouter.get('/logout', (req, res) => {
  req.logout();
  res.send({ message: 'Logout Successful.' });
});

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, { id });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      const clause = ` WHERE email='${email}'`;
      const columns = 'id, email, password';
      const data = await usersModel.select(columns, clause);
      const user = data.rows[0];
      if (!user) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (!result) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }
        return done(null, user);
      });
    }
  )
);
authRouter.post('/login', passport.authenticate('local'), (req, res) => {
  res.send({
    data: {
      auth: req.isAuthenticated(),
      userId: req.user.id,
      message: 'Login successful',
    },
  });
});

export default authRouter;
