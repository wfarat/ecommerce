import bcrypt from 'bcrypt';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import express from 'express';
import GoogleStrategy from 'passport-google-oidc';
import Model from '../models/model';
import { googleClientID, googleClientSecret } from '../settings';

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
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: 'http://localhost:3000/oauth2/redirect/google',
    },
    async (issuer, profile, cb) => {
      const email = profile.emails[0].value;
      const firstname = profile.name.givenName;
      const lastname = profile.name.familyName;
      const clause = ` WHERE email='${email}'`;
      const columns = 'id, email';
      const data = await usersModel.select(columns, clause);
      const user = data.rows[0];
      if (!user) {
        // The Google account has not logged in to this app before.  Create a
        // new user record and link it to the Google account.
        const cols = 'email, firstname, lastname';
        const values = `'${email}','${firstname}', '${lastname}'`;
        const data1 = await usersModel.insertWithReturn(cols, values);
        const user1 = data1.rows[0];
        return cb(null, user1);
      }
      // The Google account has previously logged in to the app.  Get the
      // user record linked to the Google account and log the user in.
      return cb(null, user);
    }
  )
);
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
authRouter.get('/login/google', passport.authenticate('google'));
authRouter.get('/oauth2/redirect/google',
  passport.authenticate('google', (req, res) => {
    res.send({
      data: {
        auth: req.isAuthenticated(),
        userId: req.user.id,
        message: 'Login successful',
      },
    })
  }));
export function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send({ message: 'Must be logged in to use this route.' });
  }
}
export default authRouter;
