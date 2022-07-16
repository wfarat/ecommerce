export const createAllTables = `
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  fullname VARCHAR(50) DEFAULT '',
  password VARCHAR NOT NULL
  );
CREATE TABLE IF NOT EXISTS orders (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id INT NOT NULL,
  total INT NOT NULL,
  status VARCHAR(50) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS items (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  name VARCHAR(50) NOT NULL,
  price INT NOT NULL,
  description VARCHAR NOT NULL
  );
CREATE TABLE IF NOT EXISTS cart (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id INT NOT NULL,
  item_id INT NOT NULL,
  qty INT NOT NULL,
  price INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (item_id) REFERENCES items(id)
);
CREATE TABLE IF NOT EXISTS order_items (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  order_id INT NOT NULL,
  item_id INT NOT NULL,
  qty INT NOT NULL,
  price INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (item_id) REFERENCES items(id)
);
`;
export const dropAllTables = `
DROP TABLE order_items;
DROP TABLE orders;
DROP TABLE cart;
DROP TABLE items;
DROP TABLE users;
`;

export const insertIntoAllTables = `
INSERT INTO users (email, password, fullname) VALUES ('test user', 'test password', 'test name');
INSERT INTO items (name, price, description) VALUES ('test item', 1, 'test description');
INSERT INTO items (name, price, description) VALUES ('test item 2', 2, 'test description');
INSERT INTO items (name, price, description) VALUES ('test item 3', 3, 'test description');
INSERT INTO items (name, price, description) VALUES ('test item 4', 4, 'test description');
INSERT INTO items (name, price, description) VALUES ('test item 5', 5, 'test description');
INSERT INTO items (name, price, description) VALUES ('test item 6', 6, 'test description');
INSERT INTO items (name, price, description) VALUES ('test item 7', 7, 'test description');`;

