	var app = angular.module('myApp', ["ngRoute"]);
	app.config(function($routeProvider) {
		$routeProvider
		.when("/addbook", {
			templateUrl : "addbook.html",
			controller : "addBookCtrl"
		})
		.when("/addauthor", {
			templateUrl : "addauthor.html",
			controller : "addAuthorCtrl"
		})
		
		.when("/dispBook",{
			templateUrl: "dispBook.html",
			controller : "bookDetailCtrl"
		  })
		.when("/dispEdit",{
			templateUrl: "dispEdit.html",
			controller : "bookDetailCtrl"
		})
		.when("/dispAuthor",{
			templateUrl: "dispAuthor.html",
			controller : "authorDetailCtrl"
		})
		
		.when("/authEdit",{
			templateUrl: "authEdit.html",
			controller : "authorDetailCtrl"
		  });
	});

	app.controller('displaybookCtrl', function ($scope,$rootScope,$http) {
		$http.get("http://172.27.12.104:3000/book/list")
		.then(function(response) {
			$scope.mybook = response.data;
		}); 
	});
	app.controller("addBookCtrl", function ($scope, $http) {
	
		$scope.availableOn =[
							{l:'eBay'},
							{l:'Flipkart'},
							{l:'Amazon'},
							];
		$scope.selection=[];
		// toggle selection for a given employee by name
		$scope.toggleSelection = function toggleSelection(avail) {
	    var idx = $scope.selection.indexOf(avail);

	    // is currently selected
	    if (idx > -1) {
	      $scope.selection.splice(idx, 1);
	    }

	    // is newly selected
	    else {
	      $scope.selection.push(avail);
	    }
	  };
	 
	  console.log($scope.selection);
			$scope.SendData = function () {
           // use $.param jQuery function to serialize data from JSON 
            var data ={
                isbn: $scope.isbn,
                title: $scope.title,
				author:$scope.author,
				price:$scope.price,
				availableOn:$scope.selection
            };
  
            $http({
				method:'POST',
				url:'http://172.27.12.104:3000/book/new',
				data:data
			
			})
			.then(function(response) {
				console.log(response.data);
			}, function(rejection) {
				console.log(rejection.data);
			});
        };
	});

	app.controller("addAuthorCtrl", function ($scope, $http) {

		$scope.skills = [{l:'HTML'},
							{l:'CSS'},
							{l:'JAVASCRIPT'},
							{l:'NODEJS'},
							{l:'ANGULARJS'},
							];
		$scope.selection=[];
		// toggle selection for a given employee by name
		$scope.toggleSelection = function toggleSelection(skill) {
	    var idx = $scope.selection.indexOf(skill);

	    // is currently selected
	    if (idx > -1) {
	      $scope.selection.splice(idx, 1);
	    }

	    // is newly selected
	    else {
	      $scope.selection.push(skill);
	    }
	  };
	 
	  console.log($scope.selection);
			
			$scope.SendAuthor = function () {
           // use $.param jQuery function to serialize data from JSON 
            var data ={
                empid: $scope.empid,
                name: $scope.name,
				email:$scope.email,
				skills:$scope.selection,
				department:$scope.department,
				website:$scope.website
            };
			console.log(data);
			$http({
				method:'POST',
				url:'http://172.27.12.104:3000/author/new',
				data:data
			
			})
			.then(function(response) {
				console.log(response.data);
			}, function(rejection) {
				console.log(rejection.data);
			});
        };
	});
	
	app.controller("bookDetailCtrl", function ($rootScope,$scope, $http,$location) {
			$scope.dispBook = function (book) {
				$rootScope.book=book;
			};
			$scope.book=$rootScope.book;
			
			$http.get("http://172.27.12.104:3000/book/list")
			.then(function(response)
			{
				$scope.details = response.data;
				$scope.book = $location.search();
				for(var i in $scope.details)
				{
					if($scope.book.isbn === $scope.details[i].isbn)
					{
						$scope.book = $scope.details[i];
					}
				}
				$scope.availableOn=['eBay','Flipkart','Amazon'];
                              
                $scope.array=[];
                              
                $scope.chkSelected = function(cb){
					console.log("outside for");
                                                            
					$scope.array.push(cb);
					console.log($scope.array);
					for(var i=0; i<$scope.array.length-1;i++){
						for(var j=0;j<$scope.array.length-1;j++){
							if($scope.array[i]===$scope.array[j]){
								  $scope.array.splice(j,1);
								}
						}
					}
					console.log($scope.array);
				}


			});
			
			$scope.updateBook=function (editBook){
				var data = $.param(editBook);
				var config = {
					headers : {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}
				
				$http.put('http://172.27.12.104:3000/book/update', data, config)
				 .success(function (data, status, headers, config) {
					alert(data.message);
					
				})
				.error(function (data, status, header, config) {
					$rootScope.ResponseDetails = "Data: " + data +
						"<hr />status: " + status +
						"<hr />headers: " + header +
						"<hr />config: " + config;
				});

			};
			
			$scope.deleteBook=function (deleteBook){
			   var data = $.param({isbn:deleteBook});
				var config = {
					headers : {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}
				alert('http://172.27.12.104:3000/book/remove?'+data);
				$http({
					url:'http://172.27.12.104:3000/book/remove',
					method:'DELETE',
					data:data,
					headers:{'Content-Type':'application/x-www-form-urlencoded'}
				})
				.then(function successCallback(response) {
					alert(data.message);
				}, function errorCallback(response) {
					alert('error');
				});
			};
	});
	
	app.controller("authorDetailCtrl", function ($rootScope,$scope,$http,$location) {
			
		$http.get("http://172.27.12.104:3000/author/list")
		.then(function(response)
		{
			$scope.details = response.data;
			$scope.author = $location.search();
			for(var i in $scope.details)
			{
				if($scope.author.name === $scope.details[i].name)
				{
					$scope.author = $scope.details[i];
				}
			}
			$scope.skills=['HTML','CSS','JAVASCRIPT','NODEJS','ANGULARJS'];
                              
                $scope.array=[];
                              
                $scope.chkSelected = function(skill){
					console.log("outside for");
                                                            
					$scope.array.push(skill);
					console.log($scope.array);
					for(var i=0; i<$scope.array.length-1;i++){
						for(var j=0;j<$scope.array.length-1;j++){
							if($scope.array[i]===$scope.array[j]){
								  $scope.array.splice(j,1);
								}
						}
					}
					console.log($scope.array);
				}

		});
		
		$scope.updateAuthor=function (editBook){
				var data = $.param(editBook);
				var config = {
					headers : {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}
				
				$http.put('http://172.27.12.104:3000/author/update', data, config)
				 .success(function (data, status, headers, config) {
					alert(data.message);
					
				})
				.error(function (data, status, header, config) {
					$rootScope.ResponseDetails = "Data: " + data +
						"<hr />status: " + status +
						"<hr />headers: " + header +
						"<hr />config: " + config;
				});

			};
			
		$scope.deleteAuth=function (deleteBook){
			   var data = $.param({empid:deleteBook});
				var config = {
					headers : {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}
				alert('http:172.27.12.104:3000/author/remove?'+data);
				$http({
				url:'http://172.27.12.104:3000/author/remove',
				method:'DELETE',
				data:data,
				headers:{'Content-Type':'application/x-www-form-urlencoded'}
				})
				.then(function successCallback(response) {
					alert(data.message);
				}, function errorCallback(response) {
					alert('error');
				});
			};

	});