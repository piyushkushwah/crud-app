const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
var cors = require('cors')
const app = express();

app.use(cors())

//load user routes
const person = require('./route/person');

//Load Database Config File
const db = require('./config/database');

//connect to mongoose
mongoose.connect('mongodb://piyush:piyush123@ds151853.mlab.com:51853/crudapp', {
    useNewUrlParser: true
})
.then(() => {
        console.log("MongoDb connected...");
    })
.catch(err => console.log(err));

//Body-Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//Use User Route
app.use('/api/person',person);

const port = process.env.PORT || 3000;

app.get('*', (req, res) => { 
    res.sendFile(path.resolve('public/index.html')); 
});

app.listen(port, () => {
    console.log(`Server started on port ${port} `);
});