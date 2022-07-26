import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import authRouter from './routes/auth';
import usersRouter from './routes/users';
import cartRouter from './routes/cart';
import itemsRouter from './routes/items';
import ordersRouter from './routes/orders';

const app = express();
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/cart', cartRouter);
app.use('/api/items', itemsRouter);
app.use('/api/orders', ordersRouter);
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Ecommerce API',
    version: '1.0.0',
    contact: {
      name: 'my github',
      url: 'https://github.com/wfarat',
    },
  },
  servers: [
    {
      url: 'https://ecommercewfarat.herokuapp.com/',
      description: 'Production server',
    },
  ],
  basePath: '/',
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: [ './src/routes/*.js' ],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use((err, req, res, next) => {
  res.status(400).json({ error: err.stack });
});

export default app;
