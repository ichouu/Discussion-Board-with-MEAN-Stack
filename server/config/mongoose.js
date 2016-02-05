//=======================================================
//mongoose -  require mondoose to add our db,file-system(fs) to load models
//=======================================================
var mongoose = require('mongoose');
var fs = require('fs');
mongoose.connect('mongodb://localhost/FullMean_discussionBoard');

//=======================================================
//path to models, connects all model files ending in.js
//=======================================================
var models_path = __dirname + '/../models';
fs.readdirSync(models_path).forEach(function(file)
{
	if(file.indexOf('.js') > 0)
	{
		require(models_path + '/' + file);
	}
})