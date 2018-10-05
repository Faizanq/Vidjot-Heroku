const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


//Load models
require('./models/Idea');

//Now let make instance
const Idea = mongoose.model('ideas');

//middleware
// app.use(function(req,res,next){
// 	console.log(Date.now());
// 	next();
// });

//Method overridemiddleware
app.use(methodOverride('_method'));

//Index route
app.get('/',function(req,res){
	res.render('home');
});

//About route
app.get('/about',function(req,res){
	res.render('about');
});

//Add Ideas form route
app.get('/ideas/add',function(req,res){
	res.render('ideas/add');
});

//Get all Ideas form collection
app.get('/ideas',function(req,res){
	Idea.find({})
		.sort({date:'desc'})
		.then((ideas)=>{
			res.render('ideas/index',{
				ideas:ideas
			});
		});
});

//Get specific Idea form collection
app.get('/ideas/edit/:id',function(req,res){

	Idea.findOne({
			_id:req.params.id
		})
		.then((idea)=>{
			console.log(idea);
			res.render('ideas/edit',{
				idea:idea
			});
		});
});

//Update idea
app.put('/ideas/:id',function(req,res){

	Idea.findOne({
		_id:req.params.id
	})
	.then(idea=>{
		idea.title = req.body.title;
		idea.details = req.body.details;
		idea.save()
		.then(()=>{
			res.redirect('/ideas');
			});
	});
	
});

//Process Ideas Form
app.post('/ideas',(req,res)=>{

	let errors = [];

	if(!req.body.title){
		errors.push({text:'Please enter the title'});
	}

	if(!req.body.details){
		errors.push({text:'Please enter some details'});
	}

	if(errors.length > 0){
		res.render('ideas/add',{
			errors:errors,
			title:req.body.title,
			details:req.body.details,
		})
	}else{
		const data={
			title:req.body.title,
			details:req.body.details
		}
		new Idea(data)
		.save()
		.then(idea=>{
			console.log(idea)
			res.redirect('ideas');
		});
	}
});

app.listen(port,()=>{
	console.log(`Server start listening on port ${port}`);
});