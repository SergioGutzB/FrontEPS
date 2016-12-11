var eps = angular.module('Eps');
eps.controller('HC', hcController);
hcController.$inject = ['$scope', '$rootScope', 'sData', '$location'];

function hcController($scope, $rootScope, sData, $location) {
  var self = this;
  self.sData = sData;

  $rootScope.pageTitle = 'Historia Clínica';
  $rootScope.pageIcon = 'fa-address-card';

  if (self.sData.paciente == null) {
    $location.path('/pacientes');
  }
  self.paciente = self.sData.paciente;



}