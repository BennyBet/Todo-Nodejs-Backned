//importing express js library
const express=require('express');
const path = require('path')
const Todo=require('./model/model.js');
//intantiating app as express
const app=express();
// instantiating app as express
const dotenv=require('dotevn');
dotenv.config();

app =express();
let dbUrl=process.env.DB_URL;
const mongoose = require('mongoose');

mongoose.connect(dbUrl,
  {
    useNewUrlParser:true,
    useUnifieldTopology:true,}).then(()=> {
        console.log("Database connected successfully");
    }).catch((err)=>{
        console.log(`Error in database connection ${err}`);  
    
});

//declare port
const port=process.env.PORT||300;
//create a server

app.listen(port,()=>{
    console.log('Sever is running on port ${port}');

});
///get request to post todo
app.get('/post-todo',(req,resp)=>{
    let todo=new Todo({
        title:"trip to finland",
        description:"Trip tp finland on 30th Jan 2022",
        status:true
    }).
    //save todo
    todo.save();then(()=>{
        console.log("Todo created successfully");
        resp.redirect('/fetch');
    }).catch(()=>{
        consolse.log("Error in creating a todo");
    });
});


///get request to fetch todo
app.get('/fetch',(req,resp)=>{
    Todo.find().then((todos)=>{
        console.log("Fetching data");
        console.log(todos);
        resp.send(todos);
    }).catch(()=>{
        console.log(`Error fetching todo ::\t${err}`);
   
        });
});
app.get('/public',(req,resp)=>{
    resp.sendFile(path.join(__dirname,'public,index.html'));
});

app.use('/static', express.static(path.join(__dirname, 'public')));

//creat a route
app.get('/',(req,resp)=>{
    resp.sen("welcome to my first node app");

});
app.get('/home',(req,resp)=>{
    resp.send('Get a POST request')
});
app.delete('/delete' , function (req,resp) {
    resp.send('Deleted successfully!');
});

app.patch('/patch' , function (req,resp) {
    resp.send('patched successfully!');
});
