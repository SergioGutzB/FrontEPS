var eps = angular.module('Eps');
eps.controller('Index', indexCotroller);
indexCotroller.$inject = ['$rootScope', '$location'];

function indexCotroller($rootScope, $location) {
  this.close = function() {
    console.log("close");
  };
  $rootScope.currentPage = $location.path().split('/')[1];
  this.go = function(url) {
    $rootScope.currentPage = url;
    $location.path('/' + url);
    if (url === '')
      $rootScope.currentPage = 'inicio';
  };
}