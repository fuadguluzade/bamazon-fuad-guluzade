var inquirer = require('inquirer');
var mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazonDB'
});

const viewAll = function() {
    connection.query('SELECT item_id, product_name, department_name, price, stock_quantity FROM products', (err, result) => {
        if (err) throw err;
        console.table(result);
    });
};


const viewLow = function() {
    connection.query('SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity < 200',
    (err, result) => {
        if (err) throw error;
        console.table(result);
    })
};


const addInventory = function() {
    inquirer.prompt([
        {
            name: 'id',
            message: 'Select an id of item you would like to add?',
            validate: input => {return !isNaN(input)}
        },
        {
            name: 'count',
            message: 'How many of it you would like to add?',
            validate: input => {return !isNaN(input)}
        }
    ]).then(function(response){
        var query = 'UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?';
        connection.query(query, [response.count, response.id], 
            (err, result) => {
                if (err) throw err;
                console.log(`Good with id=${response.id} is successfully updated by ${response.count} item`);
            })
    });
};


const addNew = function() {
    inquirer.prompt([
        {
            name: 'name',
            message: 'Product name?'
        },
        {
            name: 'price',
            message: 'Product price?',
            validate: input => {return !isNaN(input)}
        },
        {
            name: 'department',
            message: 'Department?',
        },
        {
            name: 'quantity',
            message: 'Quantity?',
            validate: input => {return !isNaN(input)}
        }
    ]).then(function(responses) {
        var query = 'INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES(?, ?, ?, ?)';
        connection.query(query, [responses.name, responses.department, responses.price, responses.quantity],
            (err, response) => {
                if (err) throw err;
                console.log(response);
            })
    })
};



const start = function() {
    inquirer.prompt([
        {
            name: 'choices',
            type: 'list',
            message: 'What you want to do?',
            choices: ['View Products for Sale',
                    'View Low Inventory',
                    'Add to Inventory',
                    'Add New Product'
            ]
        }
    ]).then(function(choice) {
        switch(choice.choices) {
            case('View Products for Sale') : viewAll(); break;
            case('View Low Inventory') : viewLow(); break;
            case('Add to Inventory') : addInventory(); break;
            case('Add New Product') : addNew(); break;
        }
    });
}

start();