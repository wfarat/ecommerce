import express from 'express';
import { createCart } from '../controllers/cart';

const cartRouter = express.Router();

cartRouter.post('/:userId', createCart);

export default cartRouter;
