var eps = angular.module('Eps');
eps.controller('PacienteAdd', pacienteAddController);
pacienteAddController.$inject = ['$scope', 'sData'];

function pacienteAddController($scope, sData) {
  var self = this;
  self.sData = sData;
  self.icon = 'fa-user-plus';
  self.title = 'Registrar Paciente';

  if (self.sData.paciente !== null) {
    self.paciente = self.sData.paciente;
    self.paciente.fechaNacimiento = new Date(Date.parse(self.paciente.fechaNacimiento));
    self.title = 'Editar Paciente';
    self.icon = 'fa-user';
  }
}