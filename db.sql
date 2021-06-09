CREATE TABLE customers (id SERIAL PRIMARY KEY, email VARCHAR(100) UNIQUE, first_name VARCHAR(50), last_name VARCHAR(50), password VARCHAR(50));

CREATE TABLE addresses (
  id SERIAL PRIMARY KEY,
  customer_id SERIAL REFERENCES customers(id),
  address_1 VARCHAR(50),
  address_2 VARCHAR(50),
  postal_town VARCHAR(50),
  post_code VARCHAR(50),
  country VARCHAR(50)
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  address_id INTEGER REFERENCES addresses(id),
  date_created DATE,
  status VARCHAR(50),
  price INTEGER,
  customer_id INTEGER REFERENCES customers(id),
  addressee_name VARCHAR(100)
);

CREATE TABLE stock (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) UNIQUE,
  image VARCHAR(200),
  quantity INTEGER,
  price INTEGER,
  about VARCHAR(5000)
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  stock_id INTEGER REFERENCES stock (id),
  quantity INTEGER,
  date_created DATE,
  customer_id INTEGER REFERENCES customers(id)
);

