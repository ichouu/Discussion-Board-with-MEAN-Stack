//=======================================================
//server side: posts controller
//=======================================================
//=======================================================
//attach post.js model
//=======================================================
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');
var Topic = mongoose.model('Topic');
//=======================================================
//posts.js Controller
//=======================================================
module.exports = (function() 
{
	return {
		addPost: function(req, res)
		{
			var post = new Post(req.body);
  			post.save(function(err, record){
  				if(err)
  				{
  					res.json({status:'failed', err:err})
  				}
  				else
  				{
  					// res.json({status:'success'})
  					User.update({username: req.body.author}, {$inc: { posts: 1 }}, {multi: true}, function(err1, record1)
		  			{
		  				if(err)
		  				{
		  					res.json({status:'failed', err:err1})
		  				}
		  				else
		  				{
		  					Topic.update({_id: record.topic_id}, {$inc: { posts: 1}}, {multi: true}, function(err2, record2)
		  					{
		  						if(err2)
		  						{
		  							res.json({status: 'failed', err: err2})
		  						}
		  						else 
		  						{
		  							res.json({status:'success'})
		  						}
		  					})
		  				}
		  			})
  				}
  			})
		},
		getPostsById: function(req, res)
		{
			console.log('posts controll', req.params.id);
			Post.find({ topic_id: req.params.id}, function(err, results){
				if(err) {
					console.log(err);
				} else {
					results.reverse();
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
		},
		upVotePost: function(req, res)
		{
			console.log(req.params.id);
			console.log('ready to upvote');
			Post.update({_id: req.params.id}, {$inc: { up_votes: 1}}, function(err, results)
			{
				if (err)
				{
					console.log(err);
					res.json({status: 'failed', err: err})
				}
				else 
				{
					res.json(results);	
				}
			})
		}
	}
})();