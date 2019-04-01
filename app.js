const express = require('express');
const app = express();
const port = process.env.PORT || 4321
const mysql = require('mysql');
const _ = require('lodash');
const async =require('async');
const bodyParser = require('body-parser');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fakedata'
});
const generateData = require('./generatefunction');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());


// post route to create a table with given sql schema.
app.post('/createtable', (req, res) => {
    const query = req.body;
    if ( ( query.split(" ")[0].toLowerCase() !== 'create') && (query.split(" ")[1].toLowerCase() !== 'table')) {
        return res.send("you can only create a table here. ");
    }
    connection.query(query, (err, rows, fields) => {
        if (err) {
            return res.send(err);
        }
        return res.send([rows, fields]);
    });
});


//post route to add the index on a given table.

app.post('/addtheindex',(req,res)=>{
    const query = req.body;
    var sqlQuery="";
  if(query.unique === true){
      sqlquery = `CREATE UNIQUE INDEX ${query.indexname} ON ${query.tablename} (${query.columns.toString()})`;
  }
  else{
    sqlquery = `CREATE INDEX ${query.indexname} ON ${query.tablename} (${query.columns.toString()})`;
  }
   connection.query(sqlQuery,(err,rows)=>{
       if(err){return res.send(err);}
       return res.send(rows);
   });
});

// post route to drop a index on a table.
app.post('/droptheindex',(req,res)=>{
    var query = req.body;
    var sqlQuery = `DROP IN{DEX ${query.indexname} ON ${query.tablename}`;
    connection.query(sqlQuery,(err,rows)=>{
        if(err){ return res.send(err);}
        return res.send(rows);
    });
});


app.post("/query",(req,res)=>{
  const query = req.body;

  connection.query(query,(err,rows)=>{
      if(err){return res.send(err);}

      return res.send(rows);
  });
});

//post route to create a fake data on a given table.

app.post("/generatedata/:tablename/:limit", (req,res)=>{
     var tablename =req.params.tablename;
     var limit = parseInt(req.params.limit);
     var fields= [];
     var itemset = [];
     
     async.waterfall([
         function(cb){
             var query= `describe ${tablename}`
             connection.query(query,(err,rows)=>{
                 if(err){ return cb(err);}
                _.forEach(rows ,function(item){
                    var x= item.Type.split(" ")[0];
                    fields.push(item.Field);
                    itemset.push(x.split("(")[0]);
                });
                return cb(null, fields, itemset);
             });
         },
         function(fields,itemset,cb){
             var sqlquery =`INSERT INTO ${tablename} (${fields.join(", ")}) VALUES ?`;
             for( i=0; i<limit; i=i+100){
                 var dataset =[];
                 for( j=0; j<100; j++){
                     var items= [];
                     _.forEach(itemset, function(item){
                         items.push(generateData[`${item}Generate`].handler());
                     });
                     dataset.push(items);
                 }
                connection.query(sqlquery, [dataset], (err)=>{
                    if(err){ return res.send(err);}
                });
            }
            return cb(null);
         },
         function(cb){
            connection.query(`select count(*) from ${tablename}`,(err,rows)=>{
                if(err){return res.send(err);}
                return cb(null, rows);
            });
         }
     ], function(err,rows){
        if(err){return res.send(err)} 

        return res.send(rows);
     });

     
});


app.listen(port, () => {
    console.log(`server is at port ${port}`);
});