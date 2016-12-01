var eps = angular.module('Eps');
eps.controller('Index', ['$location', indexCotroller]);

function indexCotroller($location) {
  this.close = function() {
    console.log("close");
  };
  this.go = function(url) {
    $location.path(url);
  };
}