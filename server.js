const express= require("express");
let app=express();
let cors=require("cors");
let bodyParser= require('body-parser');
const DbConnection = require("./DbConnection");



//dbconnection
require("./DbConnection")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
//app.use(express.json());
app.use(cors());

//routes
app.get('/',(req,res)=>{
    res.status(200).send('Welcome to MTRH Extension API ')
});
app.get("/extensions", (req, res)=>{

    /*const {q}= req.query;
    const key=['FirstNames', 'Department']

    const search=(data)=>{
        return data.filter((item)=> key.some((key=>item[key].toLowerCase().includes(q))))
    }*/

    DbConnection.query('SELECT * FROM mtrh_extension',(error, results, fields)=>{
        if(error) throw error;
        return res.status(200).send(results)
    })
});
app.get('/extensions/:id',(req, res)=>{
    let extension_id=req.params.id;
    if(!extension_id){
        res.status(400).send({error:true, message:'Provide Id to filter'});
    }
    DbConnection.query('SELECT * FROM mtrh_extension WHERE id=?', extension_id,(error, results, fields)=>{
        if (error) throw error;
        res.status(200).send(results[0])
    })
});
app.post('/extensions', (req, res)=> {
    
});

app.put('/extensions', function (req, res) {
    let id = req.body.id;
    let extension = req.body.extension;
    if (!id || !extension) {
    return res.status(400).send({ error: extension, message: 'Please provide extension or Id' });
    }
    dbConn.query("UPDATE mtrh_extension SET Extension = ? WHERE id = ?", [extension, id], function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
    });
});
app.delete('/extensions', function (req, res) {
    let extension_id = req.body.id;
    if (!extension_id) {
    return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    dbConn.query('DELETE FROM mtrh_extension WHERE id = ?', [extension_id], function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'User has been updated successfully.' });
    });
    }); 


app.post('/superAdmin/registerAdmin', (req, res)=>{
    const username=req.body.username;
    const password= req.body.password;

    DbConnection.query(`INSERT INTO admin (username , password) VALUES (?,?)`,[username, password],(error, results)=>{
        if(error) throw error;
        return res.status(201).send('Admin User Created  Successfully')
    })
})
app.post('/loginAdmin',(req, res)=>{
    const username=req.body.username;
    const password= req.body.password;
    DbConnection.query('SELECT * FROM admin WHERE username = ? AND password = ?',[username, password],(error,result)=>{
       if(error){
        res.send({errpr:error})
       }
       if(result){
        res.send(result)
       }
       else{
        res.send({message:'wrong Username/Password combination!!'})
       }
    })
})




//Api listening Port
app.listen(8080, (error, live)=>{
    error ? console.log(error): console.log("Server running on port 8080")
})