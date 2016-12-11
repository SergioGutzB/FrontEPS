var eps = angular.module('Eps');
eps.controller('PacienteAdd', pacienteAddController);
pacienteAddController.$inject = ['$scope', '$rootScope', 'sData'];

function pacienteAddController($scope, $rootScope, sData) {
  var self = this;
  self.sData = sData;

  $rootScope.pageTitle = 'Registrar Paciente';
  $rootScope.pageIcon = 'fa-user-plus';

  if (self.sData.paciente !== null) {
    self.paciente = self.sData.paciente;
    self.paciente.fechaNacimiento = new Date(Date.parse(self.paciente.fechaNacimiento));
    self.title = 'Editar Paciente';
    self.icon = 'fa-user';
  }
}