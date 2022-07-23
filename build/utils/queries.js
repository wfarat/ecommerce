'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.insertIntoAllTables =
  exports.dropAllTables =
  exports.createAllTables =
    void 0;
var createAllTables =
  '\nDROP TABLE IF EXISTS session;\nDROP TABLE IF EXISTS order_items;\nDROP TABLE IF EXISTS orders;\nDROP TABLE IF EXISTS cart;\nDROP TABLE IF EXISTS items;\nDROP TABLE IF EXISTS users;\nCREATE TABLE IF NOT EXISTS users (\n  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,\n  email VARCHAR(50) UNIQUE NOT NULL,\n  firstname VARCHAR(50) DEFAULT \'\',\n  lastname VARCHAR(50) DEFAULT \'\',\n  password VARCHAR DEFAULT \'\'\n  );\nCREATE TABLE IF NOT EXISTS orders (\n  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,\n  user_id INT NOT NULL,\n  total INT NOT NULL,\n  created DATE NOT NULL,\n  modified DATE NOT NULL,\n  status VARCHAR(50) NOT NULL,\n  FOREIGN KEY (user_id) REFERENCES users(id)\n);\nCREATE TABLE IF NOT EXISTS items (\n  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,\n  name VARCHAR(50) NOT NULL,\n  price INT NOT NULL,\n  description VARCHAR NOT NULL\n  );\nCREATE TABLE IF NOT EXISTS cart (\n  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,\n  user_id INT NOT NULL,\n  item_id INT NOT NULL,\n  name VARCHAR(50) NOT NULL,\n  qty INT NOT NULL,\n  price INT NOT NULL,\n  FOREIGN KEY (user_id) REFERENCES users(id),\n  FOREIGN KEY (item_id) REFERENCES items(id)\n);\nCREATE TABLE IF NOT EXISTS order_items (\n  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,\n  order_id INT NOT NULL,\n  item_id INT NOT NULL,\n  name VARCHAR(50) NOT NULL,\n  qty INT NOT NULL,\n  price INT NOT NULL,\n  FOREIGN KEY (order_id) REFERENCES orders(id),\n  FOREIGN KEY (item_id) REFERENCES items(id)\n);\nCREATE TABLE "session" (\n  "sid" varchar NOT NULL COLLATE "default",\n  "sess" json NOT NULL,\n  "expire" timestamp(6) NOT NULL\n)\nWITH (OIDS=FALSE);\n\nALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;\n\nCREATE INDEX "IDX_session_expire" ON "session" ("expire");\n';
exports.createAllTables = createAllTables;
var dropAllTables =
  '\nDROP TABLE session;\nDROP TABLE order_items;\nDROP TABLE orders;\nDROP TABLE cart;\nDROP TABLE items;\nDROP TABLE users;\n';
exports.dropAllTables = dropAllTables;
var insertIntoAllTables =
  "\nINSERT INTO users (email, password, firstname, lastname) VALUES ('test user', 'test password', 'test', 'user');\nINSERT INTO items (name, price, description) VALUES ('test item', 1, 'test description');\nINSERT INTO items (name, price, description) VALUES ('test item 2', 2, 'test description');\nINSERT INTO items (name, price, description) VALUES ('test item 3', 3, 'test description');\nINSERT INTO items (name, price, description) VALUES ('test item 4', 4, 'test description');\nINSERT INTO items (name, price, description) VALUES ('test item 5', 5, 'test description');\nINSERT INTO items (name, price, description) VALUES ('test item 6', 6, 'test description');\nINSERT INTO items (name, price, description) VALUES ('test item 7', 7, 'test description');";
exports.insertIntoAllTables = insertIntoAllTables;
