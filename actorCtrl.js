app.controller("actorsCtrl", function($scope, $http, $location, $log, actorSrv) {


    // Loading the Actors
    $scope.actors = [];
  
  
    $scope.actorSearch = function() {
      if ($scope.searchText) {
        actorSrv.actorSearch($scope.searchText).then(function(results) {
          $scope.results = results;
        }, function(err) {
          $log.error(err);
        });
      } else {
        $scope.results = [];
      }
    }
  
    $scope.results = [];
  
    // Search Resutls
  
    $scope.searchActors = [];
    $scope.searchText = "";
  
    // Adding Actors
    $scope.actors = []
    $scope.addActor = function(result) {
  
      // actorSrv.addActor(name, img, bday, imdb)
      actorSrv.getActor(result).then(function(actors) {
        $scope.actors = actors;
          $scope.results = [];
          $scope.searchText = "";
      }, function(err) {
        $log.error(err);
      })
    }
  
  
  });