export const createUsersTable = `
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL,
  fullname VARCHAR DEFAULT '',
  password VARCHAR NOT NULL
  );

  `;
export const dropUsersTable = 'DROP TABLE users';
