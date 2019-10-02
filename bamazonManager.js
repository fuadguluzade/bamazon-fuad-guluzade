var inquirer = require('inquirer');
var mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazonDB'
});

const viewAll = function() {};


const viewLow = function() {};


const addInventory = function() {};


const addNew = function() {};



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