const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');

const port = process.env.PORT || 3002;

//our engine layout
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Map global promise ;so avoid mongo warning
mongoose.Promise = global.Promise;

//connect mongoose database (local)
// mongoose.connect('mongodb://localhost/vidjot-dev').then(()=> console.log('MongoDB Connceted'))
//   .catch(err=>console.log(err));

//connect mongoose database (live)
mongoose.connect('mongodb://FaizanQureshi:v15ce4q1@ds163182.mlab.com:63182/vidjot-dev').then(()=> console.log('MongoDB Connceted'))
  .catch(err=>console.log(err));

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