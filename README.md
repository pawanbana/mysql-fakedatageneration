# mysql-fakedatageneration
This Api is used to generates fake data corresponds to schema provided by you.

- Create A table 
- Generate fake data
- query your Db

**Prerequisites**

* [NodeJs](https://nodejs.org/en/) - NodeJs required.
* [MySql](https://www.mysql.com/downloads/) - MySql required.

**First install all dependencies**

`npm install`

**Setting Database**
In app.js 
```host: 'localhost',
    user: 'mysql_username',       // default is root
    password: 'mysql_password',   // default is empty
    database: 'your_dbname'

```
    
    
**To get project running**

`npm start`    


**Routes**

- `/createtable`                       =>    Post Route provide the schema of your table.
- `/query`                             =>    Post Route provide the query in the body.
- `/generatedata/:tablename/:limit`    =>    Post Route provide the tablename and limit in the params.

## Points to Consider

it can generate data of type 

- varchar
- longtext
- bigint
- int
- tinyint
- datetime




## Built With

* [ExpressJs](http://expressjs.com/) - The Framework used
* [Lodash](https://lodash.com/) - To pick selected data from request



