var app = angular.module('userApp',['ngMaterial']);

app.controller('UserCtrl', ['$rootScope',
  '$timeout', '$scope', '$http', '$location', "$mdSidenav", '$mdDialog','$animate','$filter',
  function($rootScope,$timeout, $scope, $http, $location, $mdSidenav, $mdDialog,$animate,$filter) {
  	$rootScope.mainView = false;

	$rootScope.total = {};
	$rootScope.total.length = 0;

    var cw = $('.child').width();
	$('.child').css({
	    'height': cw + 'px'
	});

    $rootScope.userRefresh = function(){

		$http({
	      	url: '/listUserProjects',
	      	method: "POST",
	      	headers: { 'Content-Type': 'application/json' },
	      	data: JSON.stringify($rootScope.user.email)
	    }).success(function(data) {
	      	$scope.$applyAsync(function(){
				$rootScope.projectListUser = data.yourProjectList;
				$rootScope.interestListUser = data.yourInterestList;

				$rootScope.yourProjectsCount = data.yourProjectsTotal[0].yourProjectsCount
				$rootScope.yourInterestsCount = data.yourInterestsTotal[0].yourInterestsCount
				$rootScope.totalCount = data.total[0].totalCount
				$rootScope.youGaveLikesTo = data.yourProjectLikes;

				$rootScope.dataSource = data.yourProjectCounts;
				console.log("FULL RESPONSE DATA",data)

				$rootScope.departmentData = [
					{"department":"computer_science","likes":"2704659"},
					{"department":"mathematics","likes":"4499890"},
					{"department":"environmental_science","likes":"2159981"}
				];
			});
	    });

	    $http({
	      	url: '/listDepartments',
	      	method: "GET",
	      	headers: { 'Content-Type': 'application/json' }
	    }).success(function(data) {
	      	$scope.$applyAsync(function(){
  				$rootScope.Departments = data.list;
			});
	    });
	}

	$rootScope.yourProjectsCount = 5;

	if($rootScope.userRefreshState){
		$rootScope.userRefresh();
	}

	$scope.xAxis = "hour"

	$scope.displayYourLikes = function(){
    	$rootScope.yourLikesGraph = true;
    	$rootScope.yourProjectsGraph = false;
    }

    $scope.yourProjects = function(){
    	$rootScope.yourLikesGraph = false;
    	$rootScope.yourProjectsGraph = true;
    }

	$scope.delete = function(project){
		$http({
	      	url: '/deleteUserProject',
	      	method: "POST",
	      	headers: { 'Content-Type': 'application/json' },
	      	data: JSON.stringify(project)
	    }).success(function(data) {
	      	$scope.$applyAsync(function(){
				$rootScope.projectListUser = data.yourProjectList;
				$rootScope.interestListUser = data.yourInterestList;

				$rootScope.yourProjectsCount = data.yourProjectsTotal[0].yourProjectsCount
				$rootScope.yourInterestsCount = data.yourInterestsTotal[0].yourInterestsCount
				$rootScope.youGaveLikesTo = data.projectLikes;

				$rootScope.dataSource = data.yourProjectCounts;
			});
	    });

	    $rootScope.departmentData = [
			{"department":"computer_science","likes":"2704659"},
			{"department":"mathematics","likes":"4499890"},
			{"department":"environmental_science","likes":"2159981"}
		];
	}
}]);