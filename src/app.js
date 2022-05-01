import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import expressLayouts from 'express-ejs-layouts';
import authRouter from './routes/auth';
import usersRouter from './routes/users';
import { sessionSecret } from './settings';

const app = express();
app.use(expressLayouts);
app.set('layout', './layout/main');
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', authRouter);
app.use('/user', usersRouter);
app.use((err, req, res, next) => {
  res.status(400).json({ error: err.stack });
});

export default app;
