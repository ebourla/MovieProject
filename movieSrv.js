app.factory("movieSrv", function ($log, $http, $q) {

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
  

    function searchMovie(searchStr) {
      var async = $q.defer();
      
       if (searchStr) {
      // Build url to TMDB
        var tmdbURL = "https://api.themoviedb.org/3/search/movie?api_key=fdbfd6ade787f849f52154945fc8397d&query=" + searchStr;
        //$scope.searchMovText;

      // Call TMDB
        $http.get(tmdbURL).then(function(res) {
          // after respone - Update  $scope.results with the results  
          //console.log(res.data);
          //$scope.results = res.data.results;
          
          async.resolve(res.data.results);
        }, function(err) {
          async.reject();
        });
      } else {
        async.resolve([]);
      }
      
       return async.promise;
    }


    //Add Movies
    function addMovie(result) {
        var async = $q.defer();

        // var newMovie = new Movie(name, img, lengthMinutes, director, stars);
        // movie.push(newMovie);
        // async.resolve(newMovie);

        // return async.promise;
        
          
          var tmdbMovieDetailsUrl = "https://api.themoviedb.org/3/movie/" + result.id + "?api_key=53d2ee2137cf3228aefae083c8158855";
          $http.get(tmdbMovieDetailsUrl).then(function(response) {
            // success
            var tmdbMovieCreditsURL = "https://api.themoviedb.org/3/movie/" + result.id + "/credits?api_key=fdbfd6ade787f849f52154945fc8397d";
            $http.get(tmdbMovieCreditsURL).then(function(creditsResponse) {
    
              var newMovie = new Movie(response.data, creditsResponse.data);
              async.resolve(newMovie);
            });
            console.log(response.data);
          }, function(error) {
            // error
            console.error(error);
          });
        
          return async.promise;
    }


    return {
        // getMovie: getMovie,
        addMovie: addMovie,
        searchMovie: searchMovie
    };

});