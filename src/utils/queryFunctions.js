import { pool } from '../models/pool';
import { createUsersTable, dropUsersTable } from './queries';

export const executeQueryArray = async (arr) => new Promise((resolve) => {
  const stop = arr.length;
  arr.forEach(async (q, index) => {
    await pool.query(q);
    if (index + 1 === stop) resolve();
  });
});

export const createTables = () => executeQueryArray([ createUsersTable ]);
export const dropTables = () => executeQueryArray([ dropUsersTable ]);
