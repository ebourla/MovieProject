app.factory("actorSrv", function($log, $http, $q) {

    function Actor(tmdbActor) {
      this.name = tmdbActor.name;
      this.img = "https://image.tmdb.org/t/p/w500" + tmdbActor.profile_path;
      this.bday = tmdbActor.birthday;
      this.imdb = "https://www.imdb.com/name/" + tmdbActor.imdb_id;
    }
   var actors=[]; 
    var wasEverLoaded = false;
    //Get Actor function
    function getActor(result) {
      var async = $q.defer();
      console.log("ppp");
      console.log(result);
      // if (wasEverLoaded) {
      //   async.resolve(actors);
      // } else {
        // Call TMDB API to get actor details
        var tmdbActorDetailsUrl =
          "https://api.themoviedb.org/3/person/" + result.id + "?api_key=53d2ee2137cf3228aefae083c8158855"
        $http.get(tmdbActorDetailsUrl).then(function(response) {
          // success
          //for (var i = 0; i < response.data.length; i++) {
            actors.push(new Actor(response.data));
          //}
          //wasEverLoaded = true;
          async.resolve(actors); // resolving the promise with the actors array 
        }, function(error) {
          // error
          console.error(error);
          async.reject(err); // rejecting the promise
        });
  //    }
  
      return async.promise;
    }
  
    function actorSearch(searchText) {
      var async = $q.defer();
      // Clean search box
      var results = [];
  
      if (searchText) {
        // Build url to TMDB
        var tmdbURL = "https://api.themoviedb.org/3/search/person?api_key=53d2ee2137cf3228aefae083c8158855&query=" +
          searchText;
  
        // Call TMDB
        $http.get(tmdbURL).then(function(res) {
          // after respone - Update  $scope.results with the results  
          results = res.data.results;
          async.resolve(results);
        }, function(err) {
          console.error(err);
        })
      } else {
        results = [];
      }
  
      return async.promise;
    }
  
    //Add Actor function
    function addActor(name, img, bday, imdb) {
      var async = $q.defer();
  
      var newActor = new Actor(name, img, bday, imdb);
      actors.push(newActor);
      async.resolve(newActor);
  
      return async.promise;
    }
  
  
    return {
      getActor: getActor,
      addActor: addActor,
      actorSearch: actorSearch
    };
  
  });