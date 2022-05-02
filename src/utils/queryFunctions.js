import { pool } from '../models/pool';
import {
  createCartItemsTable,
  createCartsTable,
  createItemsTable,
  createOrderItemsTable,
  createOrdersTable,
  createUsersTable,
  dropCartItemsTable,
  dropCartsTable,
  dropItemsTable,
  dropOrderItemsTable,
  dropOrdersTable,
  dropUsersTable,
} from './queries';

export const executeQueryArray = async (arr) => new Promise((resolve) => {
  const stop = arr.length;
  arr.forEach(async (q, index) => {
    await pool.query(q);
    if (index + 1 === stop) resolve();
  });
});

export const createTables = () => executeQueryArray([
  createUsersTable,
  createOrdersTable,
  createItemsTable,
  createCartsTable,
  createCartItemsTable,
  createOrderItemsTable,
]);
export const dropTables = () => executeQueryArray([
  dropUsersTable,
  dropOrdersTable,
  dropItemsTable,
  dropCartsTable,
  dropCartItemsTable,
  dropOrderItemsTable,
]);
