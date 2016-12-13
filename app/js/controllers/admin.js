var eps = angular.module('Eps');
eps.controller('Admin', adminController);
adminController.$inject = ['$scope', '$rootScope', 'sData', '$location', 'eps'];

function adminController($scope, $rootScope, sData, $location, eps) {
  var self = this;
  self.sData = sData;
  $rootScope.currenPage = 'admin';
  $rootScope.pageTitle = 'Añadir Especialidad';
  $rootScope.pageIcon = 'fa-cog';

  self.addEspecialidad = function() {
    if (self.especialidad)
      eps.addEspecialidad({ name: self.especialidad })
      .then(function(res) {
        console.log(res);
      });
  };
}