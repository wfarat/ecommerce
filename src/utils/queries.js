export const createUsersTable = `
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  fullname VARCHAR(50) DEFAULT '',
  password VARCHAR NOT NULL
  );
  `;
export const dropUsersTable = 'DROP TABLE users';
export const createOrdersTable = `
DROP TABLE IF EXISTS orders;
CREATE TABLE IF NOT EXISTS orders (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id INT NOT NULL,
  total INT NOT NULL,
  status VARCHAR(50) NOT NULL,
  created DATE NOT NULL,
  modified DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
)`;
export const dropOrdersTable = 'DROP TABLE orders';
export const createItemsTable = `
DROP TABLE IF EXISTS items;
CREATE TABLE IF NOT EXISTS items (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  price INT NOT NULL,
  decription VARCHAR NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
)`;
export const dropItemsTable = 'DROP TABLE items';
export const createCartsTable = `
DROP TABLE IF EXISTS carts;
CREATE TABLE IF NOT EXISTS carts (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id INT NOT NULL,
  created DATE NOT NULL,
  modified DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
)`;
export const dropCartsTable = 'DROP TABLE carts';
export const createOrderItemsTable = `
DROP TABLE IF exists order_items;
CREATE TABLE IF NOT EXISTS order_items (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  order_id INT NOT NULL,
  item_id INT NOT NULL,
  qty INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (item_id) REFERENCES items(id)
)`;
export const dropOrderItemsTable = 'DROP TABLE order_items';
export const createCartItemsTable = `
DROP TABLE IF exists cart_items;
CREATE TABLE IF NOT EXISTS cart_items (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  card_id INT NOT NULL,
  item_id INT NOT NULL,
  qty INT NOT NULL,
  FOREGIN KEY (card_id) REFERENCES carts(id),
  FOREIGN KEY (item_id) REFERENCES items(id)
)`;
export const dropCartItemsTable = 'DROP TABLE cart_items';
