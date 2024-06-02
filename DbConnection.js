let mysql=require("mysql2");

let DbConnection=mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: "",
    database:"mtrh"
});

DbConnection.connect((error)=>{
    error ? console.log(error): console.log('Database Connection Established....')
})
module.exports= DbConnection;