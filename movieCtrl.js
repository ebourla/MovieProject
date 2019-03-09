app.controller("movieCtrl", function($scope, $http, $location, $log, movieSrv) {

    function Movie(tmdbMovie, tmdbMovieCredits) {
      this.name = tmdbMovie.original_title;
      this.posterImg = "https://image.tmdb.org/t/p/w500" + tmdbMovie.poster_path;
      console.log(tmdbMovieCredits);
      this.lengthMinutes = tmdbMovie.runtime;
  
      this.director = tmdbMovieCredits.crew[0].name;
      this.stars = getCharacters(tmdbMovieCredits.cast);
    }
  
    function getCharacters(castObj) {
      var stars = [];
      for (var i = 0; i < 5; i++) {
        console.log(castObj[i].name);
        stars.push(castObj[i].name);
  
      }
      return stars;
    }
    
    
      // Search Resutls
    $scope.results = [];
    $scope.searchMovie = function() {
      
      movieSrv.searchMovie($scope.searchMovText).then(function(result){
         $scope.results = result;
      });
      
    };
  
    // Adding Movies
    $scope.movies = [];
    $scope.addMovie = function(result) {
      // Clean search box
      $scope.results = [];
      $scope.searchMovText = "";
      
      movieSrv.addMovie(result).then(function(newMovie){
         $scope.movies.push(newMovie);
      });
      
      
  
      // Call TMDB API to get movie details
      // var tmdbMovieDetailsUrl = "https://api.themoviedb.org/3/movie/" + result.id + "?api_key=53d2ee2137cf3228aefae083c8158855";
      // $http.get(tmdbMovieDetailsUrl).then(function(response) {
      //   // success
      //   var tmdbMovieCreditsURL = "https://api.themoviedb.org/3/movie/" + result.id + "/credits?api_key=fdbfd6ade787f849f52154945fc8397d";
      //   $http.get(tmdbMovieCreditsURL).then(function(creditsResponse) {
  
      //     $scope.movies.push(new Movie(response.data, creditsResponse.data));
      //   });
      //   console.log(response.data);
      // }, function(error) {
      //   // error
      //   console.error(error);
      // });
  
    };
  
  });