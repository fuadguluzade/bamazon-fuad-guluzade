var mysql = require('mysql');
var inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazonDB'
});

const viewProductSales = () => {
    var query = 'SELECT departments.department_id, departments.department_name, departments.over_head_costs, ';
    query += 'SUM(products.product_sales) as product_sales, (SUM(products.product_sales) - departments.over_head_costs) as total_profit ';
    query += 'FROM departments INNER JOIN products ';
    query += 'ON products.department_name = departments.department_name GROUP BY products.department_name';
    connection.query(query, (err, results) => {
        if (err) throw err;
        console.table(results);
        start();
    });
}


const createNewDepartment = () => {
    inquirer.prompt([
        {
            name: 'name',
            message: 'Enter new department name'
        },
        {
            name: 'overhead',
            message: 'Enter overhead costs',
            validate: input => { return !isNaN(input) }
        }
    ]).then(function (responses) {
        var query = 'INSERT INTO departments(department_name, over_head_costs) VALUES (? , ?)';
        connection.query(query, [responses.name, responses.overhead], 
            (err, result) => {
                if(err) throw err;
                console.log(`${responses.name} was added to department list`);
                start();
            })
    });
}

const start = () => {
    inquirer.prompt([
        {
            name: 'choices',
            type: 'list',
            message: 'Choose what you want to do',
            choices: ['View Product Sales by Department',
                'Create New Department']
        }
    ]).then(function (choice) {
        switch (choice.choices) {
            case ('View Product Sales by Department'): viewProductSales(); break;
            case ('Create New Department'): createNewDepartment(); break;
        }
    })
}

start();