//=======================================================
//usersFactory -- New User
//=======================================================
discussionBoardModule.factory('usersFactory', function($http)
{
	var factory = {};

	factory.checkUserExists = function (name, callback)
	{
		console.log('here', name);
		$http.post('/checkUserExists/'+ name).success(function(output){ callback(output); });
	}

	factory.addUser = function(data, callback)
	{
		$http.post('/addUser', data).success(function(output){ callback(output); });
	}

	factory.getUser = function(data, callback)
	{
		console.log(data);
		$http.get('/showUser/' + data).success(function(output){ callback(output); });
	}

	return factory;
});