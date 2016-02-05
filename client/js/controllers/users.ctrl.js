//=======================================================
//client side: usersController
//=======================================================
discussionBoardModule.controller('usersController', function($scope, usersFactory)
{
	//need to set a cookie to keep track of the user logged in

	//=======================================================
	//FUNCTION TO SET COOKIE (from w3schools)
	//http://www.w3schools.com/js/js_cookies.asp
	//=======================================================
	function setCookie(cname, cvalue, exdays)
	{
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}
	//=======================================================
	//The parameters of the function above are the name of the cookie (cname), 
	//the value of the cookie (cvalue), and the number of days until the cookie should expire (exdays).
	//The function sets a cookie by adding together the cookiename, the cookie value, and the expires string.
	//=======================================================

	//=======================================================
	//FUNCTION TO GET COOKIE (from w3schools)
	//http://www.w3schools.com/js/js_cookies.asp
	//=======================================================
	function getCookie(cname)
	{
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++)
		{
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
		}
		return "";
	}
	//=======================================================
	//Take the cookiename as parameter (cname).
	//Create a variable (name) with the text to search for (cname + "=").
	//Split document.cookie on semicolons into an array called ca (ca = document.cookie.split(';')).
	//Loop through the ca array (i=0;i<ca.length;i++), and read out each value c=ca[i]).
	//If the cookie is found (c.indexOf(name) == 0), return the value of the cookie (c.substring(name.length,c.length).
	//If the cookie is not found, return "".
	//=======================================================

	//=======================================================
	//FUNCTION TO CHECK COOKIE (from w3schools)
	//http://www.w3schools.com/js/js_cookies.asp
	//=======================================================
	function checkCookie()
	{
		var username=getCookie("username");
		if (username!="")
		{
			window.location.assign("/#/dashboard");
			// redirectTo('/dashboard');
		}
		else 
		{
			console.log('no cookie');
		}
		// else
		// {
		// 	username = prompt("Please enter your name:", "");
		// 	if (username != "" && username != null)
		// 	{
		// 		setCookie("username", username, 30);
		// 	}
		// }
	}
	//=======================================================
	//The parameters of the function above are the name of the cookie (cname), 
	//the value of the cookie (cvalue), and the number of days until the cookie should expire (exdays).
	//The function sets a cookie by adding together the cookiename, the cookie value, and the expires string.
	//=======================================================
	
	checkCookie();

	$scope.userdata = [];
	
	var getUser = function()
	{
		usersFactory.getUser(function(data)
		{
			$scope.userdata = data;
		});
	}

	// getUser();

	
	var checkUserExists = function(name, callback)
	{
		usersFactory.checkUserExists(name, callback);
	}

	// getUsersList();

	$scope.addUser = function() 
	{
		var check = $scope.newUser;
		if(angular.isDefined($scope.newUser.username) == false)
		{
			$('#error').text('Name field cannot be empty.');
			return;
		} 
		else
		{
			// console.log('1', $scope.newUser);
			// $scope.newUser.topics = 0;
			// $scope.newUser.posts = 0;
			// $scope.newUser.comments = 0;
			// usersFactory.addUser($scope.newUser, function(result){
			// 	console.log('this is result', result);
			// 	if(result.status == 'failed')
			// 	{
			// 		console.log(result.err.errors.username.message);
			// 		$('#error').text(result.err.errors.username.message);
			// 	}
			// 	else 
			// 	{
			// 		setCookie("username", $scope.newUser.username, 30);
			// 		window.location.assign("/#/dashboard");
			// 		console.log($scope.newUser.username);
			// 	}
			// });
			// RE ATTACH FOR CHECKING LOGINS AND ADDING PW
			checkUserExists($scope.newUser.username, function(result)
			{
				// console.log(result[0].username);
				// console.log(typeof(result[0].username));
				var nameToTest = '';
				if(!jQuery.isEmptyObject(result))
				{
					nameToTest = result[0].username;
				}
				if (nameToTest == $scope.newUser.username)
				{
					// $('#error').text($scope.newUser.username + ' is taken, please choose a different name.');
					// return;
					setCookie("username", $scope.newUser.username, 30);
					window.location.assign("/#/dashboard");
					console.log($scope.newUser.username);
				}
				else 
				{
			
						console.log('1', $scope.newUser);
						$scope.newUser.topics = 0;
						$scope.newUser.posts = 0;
						$scope.newUser.comments = 0;
						usersFactory.addUser($scope.newUser, function(result){
							console.log('this is result', result);
							if(result.status == 'failed')
							{
								console.log(result.err.errors.username.message);
								$('#error').text(result.err.errors.username.message);
							}
							else 
							{
								setCookie("username", $scope.newUser.username, 30);
								window.location.assign("/#/dashboard");
								console.log($scope.newUser.username);
							}
						});
						
				}
			});
		} 
	}

	// setting scope as empty so that I can evaluate for empty items inside the addUser function
	$scope.newUser = {};
})