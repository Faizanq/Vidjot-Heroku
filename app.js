const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');

const port = process.env.PORT || 3002;

//our engine layout
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//middleware
app.use(function(req,res,next){
	console.log(Date.now());
	next();
});

//Index route
app.get('/',function(req,res){
	res.render('home');
});

//About route
app.get('/about',function(req,res){
	res.render('about');
});


app.listen(port,()=>{
	console.log(`Server start listening on port ${port}`);
});