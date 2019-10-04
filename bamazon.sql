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

        CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NOT NULL,
  over_head_costs VARCHAR(100) NOT NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES('electronics', 5500),
        ('kitchenware', 1000),
        ('menswear', 1500),
        ('bedroom', 3000),
        ('womanwear', 5000),
        ('shoes', 500),
        ('baby', 800),
        ('grocery', 300),
        ('fitness', 2500);

        CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NOT NULL,
  over_head_costs VARCHAR(100) NOT NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES('electronics', 5500),
        ('kitchenware', 1000),
        ('menswear', 1500),
        ('bedroom', 3000),
        ('womanwear', 5000),
        ('shoes', 500),
        ('baby', 800),
        ('grocery', 300),
        ('fitness', 2500);