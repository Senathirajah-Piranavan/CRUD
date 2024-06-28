const express = require('express');
const users= require('./sample.json');
const cors = require('cors');

const app = express();
const port = 8000;
app.use(cors({
     origin : "http://localhost:5173",
     methods : ['GET', 'POST', 'PATCH', 'DELETE'],
}));

// Display all users
app.get("/users",(req, res) =>{
     return res.json(users);
});

app.listen(port, (err) => {console.log(`App  is running in port ${port}`);});