const express = require("express");
const mysql = require("mysql");
const app = express();

var con = mysql.createConnection({
    host : 'localhost',
    port : '8889',
    user : 'saket',
    password : 'password'
})

con.connect((err)=>{

    if (err){
        console.log(err);
    }else{
        console.log("database connected....")
    }
})

app.get("/createdb", (req, res)=>{
    let mysql_db = 'CREATE DATABASE ecommerce';
    con.query(mysql_db, (err, result)=>{
        if (err){
            console.log(err);
        }else{
            console.log("Database created.....!");
            res.send("Database created.....!");
        }
    })
})

var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log(host, port);
    console.log("Success......!")
  });