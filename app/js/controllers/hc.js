var eps = angular.module('Eps');
eps.controller('HC', hcController);
hcController.$inject = ['$scope', 'sData', '$location'];

function hcController($scope, sData, $location) {
  var self = this;
  self.sData = sData;
  if (self.sData.paciente == null) {
    $location.path('/pacientes');
  }
  self.paciente = self.sData.paciente;



}