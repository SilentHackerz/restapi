const express = require('express')
const bodyParser= require('body-parser')
const mongoose= require('mongoose')
const db=require("./dbConnect")
const Users=require("./models/userz")

const app = express()
//it is returning a function.
const port = 1234

// app.get('/', (req, res) => res.send('Hello World!'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//inserting data
app.post("/user1/add", function(req,res,next){
    var user=new Users();
    user.name=req.body.name;
    user.email=req.body.email;

    user.save(function(err){
        if(err){
            throw err;
        }
        else{
            res.send("Data send to database");
        }
    })
})

// fetching data from mongodb
app.get("/user2/find", function(req,res,next){

    Users.find({},function(err,userw){
        if(err){
            throw err;
        }
        else{
            res.json(userw);
        }
    })
})

//Deleting data from MongoDB
app.delete('/user3/:id',function(req,res,next){
    Users.remove({email:req.params.id},function(err){
        if(err){
            throw err;
        }
        res.json({"Status":"Successfully Deleted"});
    });
});

//updating data
app.put('/user4/:id',function(req,res,next){
    Users.findById(req.params.id,function(err,user){
        if(err){
            throw err;
        }
        user.name = req.body.name;
        user.email = req.body.email;
        user.save(function(err){
            if(err){
                throw err;
            }
            res.json(user);
            console.log("Data Updated Successfully"); 
        });
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))