var eps = angular.module('Eps');
eps.controller('DashBoard', DashBoardController);
DashBoardController.$inject = ['$rootScope', '$location', '$auth'];

function DashBoardController($rootScope, $location, $auth) {

  $rootScope.currentPage = 'inicio';
  $rootScope.pageTitle = 'Inicio';
  $rootScope.pageIcon = 'fa-home';
}