import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import expressLayouts from 'express-ejs-layouts';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import authRouter from './routes/auth';
import usersRouter from './routes/users';
import { sessionSecret } from './settings';
import cartRouter from './routes/cart';
import itemsRouter from './routes/items';
import ordersRouter from './routes/orders';


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
app.use('/users', usersRouter);
app.use('/cart', cartRouter);
app.use('/items', itemsRouter);
app.use('/orders', ordersRouter);
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Ecommerce API',
    version: '1.0.0',
    contact: {
      name: 'my github',
      url: 'https://github.com/wfarat',
    }
  },
  servers: [{
    url: 'https://ecommercewfarat.herokuapp.com/',
    description: 'Production server',
  }],
  basePath: '/',
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use((err, req, res, next) => {
  res.status(400).json({ error: err.stack });
});

export default app;
