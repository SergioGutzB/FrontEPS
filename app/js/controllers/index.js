var eps = angular.module('Eps');
eps.controller('Index', indexController);
indexController.$inject = ['$rootScope', '$location', '$auth'];

function indexController($rootScope, $location, $auth) {

  var self = this;
  self.close = function() {
    console.log("close");
  };



  $rootScope.pageTitle = 'Inicio';
  $rootScope.pageIcon = 'fa-home';
  $rootScope.currentPage = $location.path().split('/')[1];
  self.go = function(url) {
    $rootScope.currentPage = url;
    $location.path('/' + url);
    if (url === '')
      $rootScope.currentPage = 'inicio';
  };
}