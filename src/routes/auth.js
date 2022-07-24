import bcrypt from 'bcrypt';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import express from 'express';
import GoogleStrategy from 'passport-google-oidc';
import Model from '../models/model';
import { addUser } from '../controllers/users';

const federatedModel = new Model('federated_credentials');
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
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3001/oauth2/redirect/google',
      scope: [ 'profile', 'email' ],
    },
    async (issuer, profile, cb) => {
      const clause = ` WHERE provider='${issuer}' AND subject='${profile.id}'`;
      const data = await federatedModel.select('*', clause);
      if (data.rows.length === 0) {
        const fullname = profile.displayName.split(' ');
        const firstname = fullname[0];
        const lastname = fullname[1];
        const email = profile.emails[0].value;
        const data1 = await usersModel.insertWithReturn(
          'email, firstname, lastname',
          `'${email}', '${firstname}', '${lastname}'`
        );
        const user = data1.rows[0];
        const columns = 'user_id, provider, subject';
        const values = `'${user.id}', '${issuer}', '${profile.id}'`;
        await federatedModel.insert(columns, values);
        return cb(null, user);
      }
      const data2 = await usersModel.select(
        '*',
        ` WHERE id='${data.rows[0].user_id}'`
      );
      const user1 = data2.rows[0];
      return cb(null, user1);
    }
  )
);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Create an user.
 *     description: Creates a new user in database if email doesn't already exist in database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 description: The user's full name.
 *                 example: Leanne Graham
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: 41589uwfdusad12
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: example@gmail.com
 *     tags:
 *      - Users
 *     responses:
 *       201:
 *         description: users
 */
authRouter.post('/register', addUser);
authRouter.post('/login', passport.authenticate('local'), (req, res) => {
  res.send({
    data: {
      auth: req.isAuthenticated(),
      userId: req.user.id,
      message: 'Login successful',
    },
  });
});
authRouter.get('/login/federated/google', passport.authenticate('google'));
authRouter.get(
  '/oauth2/redirect/google',
  passport.authenticate('google', {
    successRedirect: '/google',
    failureRedirect: '/login',
  })
);
export function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send({ message: 'Must be logged in to use this route.' });
  }
}
export default authRouter;
