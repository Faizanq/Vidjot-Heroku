const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


//Load models
require('../models/Idea');
//Now let make instance
const Idea = mongoose.model('ideas');


//Add Ideas form route
router.get('/add',function(req,res){
	res.render('ideas/add');
});

//Get all Ideas form collection
router.get('/',function(req,res){
	Idea.find({})
		.sort({date:'desc'})
		.then((ideas)=>{
			res.render('ideas/index',{
				ideas:ideas
			});
		});
});

//Get specific Idea form collection
router.get('/edit/:id',function(req,res){

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
router.put('/:id',function(req,res){

	Idea.findOne({
		_id:req.params.id
	})
	.then(idea=>{
		idea.title = req.body.title;
		idea.details = req.body.details;
		idea.save()
		.then(()=>{
			req.flash('success_msg','Video idea updated');
			res.redirect('/ideas');
			});
	});
	
});


//Delete idea
router.delete('/:id',function(req,res){
	Idea.remove({
		_id:req.params.id
	})
	.then(()=>{
			req.flash('success_msg','Video idea removed');
			res.redirect('/ideas');
	});
});

//Process Ideas Form
router.post('/',(req,res)=>{

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
			req.flash('success_msg','Video idea added');
			res.redirect('ideas');
		});
	}
});


module.exports = router;