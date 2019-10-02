var mysql = require('mysql');
var inquirer = require('inquirer');
var cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazonDB'
});

const showGoods = function () {
    connection.connect(function (err) {
        if (err) throw err;
        connection.query("SELECT * FROM products", function (err, result) {
            if (err) throw err;
            console.table(result);
        });
    });
}


const start = function() {
    inquirer.prompt([
        {
            name: 'id',
            message: 'Type the id of the product you want to buy',
            validate: value => {
                if(isNaN(value)) {
                    return false;
                }
                return true;
            }
        },
        {
            name: 'count',
            message: 'How many units of this product you would like to buy?',
            validate: value => {
                if(isNaN(value)) {
                    return false;
                }
                return true;
            }
        }
    ]).then(function (answers) {
        connection.query(`SELECT * FROM products WHERE item_id=${answers.id}`, (err, results) => {
            if (err) throw err;
            if (results[0].stock_quantity < answers.count) {
                console.log('Insufficent quantity!');
                start();
            } else {
                connection.query('UPDATE products SET ? WHERE ?',
                [
                    {
                        stock_quantity: results[0].stock_quantity - answers.count
                    },
                    {
                        item_id: answers.id
                    }
                ], (err, result) => {
                    if (err) throw err;
                    connection.query(`SELECT * FROM products WHERE item_id=${answers.id}`, (err, results) => {
                        if (err) throw err;
                        console.log(`The total cost of your purchase is $${results[0].price * answers.count}`);
                    });
                });
            };
        });
        
    })
    showGoods();
}

start();
