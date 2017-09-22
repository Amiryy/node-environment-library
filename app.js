var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors');


var db;
console.log('Hello');

if(process.env.ENV == 'test'){
    db = mongoose.connect('mongodb://localhost/bookAPI_test');
}else{
    db = mongoose.connect('mongodb://localhost/bookAPI');
}

var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

bookRouter = require('./Routes/bookRoutes')(Book);


app.use(cors())


app.use('/api/books', bookRouter);
//Once we add "authors" route: 
//app.use('/api/authors', authorRouter);



app.get('/', function(req, res){
   res.send('Welcome to my API!');
});

app.listen (port, function (){
   console.log('Gulp is running my app on PORT: '+port); 
});

module.exports = app;