//=======================================================
//server side: topics controller
//=======================================================
//=======================================================
//attach topic.js model
//=======================================================
var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');
var User = mongoose.model('User');
//=======================================================
//topics.js Controller
//=======================================================
module.exports = (function() 
{
	return {
		addTopic: function(req, res)
		{
			var topic = new Topic(req.body);
  			topic.save(function(err, record){
  				if(err)
  				{
  					res.json({status:'failed', err:err})
  				}
  				else
  				{
  					// res.json({status:'success'})
  					User.update({username: req.body.author}, {$inc: { topics: 1 }}, {multi: true}, function(err1, record1)
		  			{
		  				if(err)
		  				{
		  					res.json({status:'failed', err:err1})
		  				}
		  				else
		  				{
		  					res.json({status:'success'})
		  				}
		  			})
  				}
  			})
		},
		getTopics: function(req, res)
		{
			Topic.find({}, function(err, results){
				if(err) {
					console.log(err);
				} else {
					res.json(results);
				}
			})
		},
		getTopicById: function(req, res)
		{
			console.log('server control', req.params.id);
			Topic.find({ _id: req.params.id}, function (err, results) {
				if (err){
					console.log('ERR');
				} else {
					res.json(results);
				}
			})
		}
	}
})();