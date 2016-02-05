//=======================================================
//usersFactory -- New User
//=======================================================
discussionBoardModule.factory('dashboardFactory', function($http)
{
	var factory = {};

	factory.getUsers = function (callback)
	{
		$http.get('/getUsers').success(function(output){ callback(output); });
	}

	factory.addUser = function(data, callback)
	{
		$http.post('/addUser', data).success(function(output){ callback(output); });
	}

	factory.addTopic = function(data, callback)
	{
		$http.post('/addTopic', data).success(function(output){ callback(output); });
	}

	factory.getTopics = function(callback)
	{
		$http.get('/getTopics').success(function(output){ callback(output); });
	}

	factory.showUser = function(user, callback)
	{
		$http.get('/showUser/' + user).success(function(output){ callback(output); });
	}
	factory.destroyCustomer = function(id, callback)
	{
		$http.delete('/destroyCustomer/' + id).success(function(output){ callback(output); });
	}

	return factory;
});