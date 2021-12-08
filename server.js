const express = require("express");
const mysql = require("mysql");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken")
app.use(express.json())

var knex = require('knex')({
    client: "mysql",
    connection: {
        host : 'localhost',
        port : '8889',
        user : 'saket',
        password : 'password',
        database : 'ecommerce'
    }
})

// route to product.js
var book = express.Router();
app.use("/", book);
require("./Routes/books")(book,knex);

// route to customer.js
var customer = express.Router();
app.use("/", customer);
require("./Routes/customer")(customer,jwt,knex);

// route to orders
var orders = express.Router();
app.use("/", orders);
require("./Routes/orders")(orders,knex);

// the port listener
var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log(host, port);
    console.log("Success......!")
  });

