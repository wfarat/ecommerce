import bcrypt from 'bcrypt';
import passport from 'passport';
import connectEnsureLogin from 'connect-ensure-login';
import LocalStrategy from 'passport-local';
import express from 'express';
import Model from '../models/model';

const usersModel = new Model('users');
const authRouter = express.Router();
authRouter.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

authRouter.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

authRouter.get('/secret', connectEnsureLogin.ensureLoggedIn(), (req, res) => res.render('secret', { title: 'Secret Page' }));
authRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
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
      const columns = 'id, fullname, email, password';
      const data = await usersModel.select(columns, clause);
      const user = data.rows[0];
      if (!user.email) {
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
authRouter.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/secret',
  }),
  (req, res) => {
    console.log(req.user);
  }
);
export default authRouter;