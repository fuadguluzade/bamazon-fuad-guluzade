DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR NOT NULL,
  department_name VARCHAR NOT NULL,
  price INTEGER NOT NULL,
  stock_quantity INTEGER NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES('Laptop', 'electronics', 1500, 50),
        ('Pan', 'kitchenware', 10, 200),
        ('T-shirt', 'menswear', 15, 500),
        ('Pillows', 'bedroom', 30, 200),
        ('Dress', 'womanwear', 50, 250),
        ('Skechers', 'shoes', 55, 230),
        ('Diapers', 'baby', 8, 600),
        ('Apples', 'grocery', 3, 1000),
        ('Pilates', 'fitness', 25, 130),
        ('Balexa', 'electronics', 120, 90);