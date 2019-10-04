var mysql = require('mysql');
var inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazonDB'
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

const showGoods = function () {
    return new Promise(function (resolve, reject) {
        connection.query("SELECT item_id,product_name,price,stock_quantity FROM products", function (err, result) {
            if (err) throw err
            resolve(result);
        });
    })
}

const start = async function () {
    var result = await showGoods();
    console.table(result);
    inquirer.prompt([
        {
            name: 'id',
            message: 'Type the id of the product you want to buy',
            validate: input => { return !isNaN(input) }
        },
        {
            name: 'count',
            message: 'How many units of this product you would like to buy?',
            validate: input => { return !isNaN(input) }
        }
    ]).then(function (answers) {
        connection.query(`SELECT * FROM products WHERE item_id=?`, [answers.id], (err, results) => {
            if (err) throw err;
            if (results[0].stock_quantity < answers.count) {
                console.log('Insufficent quantity!');

            } else {
                connection.query('UPDATE products SET ? WHERE ?',
                    [
                        {
                            stock_quantity: results[0].stock_quantity - answers.count,
                            product_sales: results[0].price * answers.count
                        },
                        {
                            item_id: answers.id,
                            item_id: answers.id
                        }
                    ],
                    (err, result) => {
                        if (err) throw err;
                        console.log(`The total cost of your purchase is $${results[0].price * answers.count}`);
                    });
            };
            start();
        });

    });
}




