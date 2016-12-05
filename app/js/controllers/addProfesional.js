var eps = angular.module('Eps');
eps.controller('ProfesionalAdd', profesionalAddController);
profesionalAddController.$inject = ['$scope', 'sData'];

function profesionalAddController($scope, sData) {
  var self = this;
  self.sData = sData;
  self.icon = 'fa-user-plus';
  self.title = 'Registrar Paciente';

  if (self.sData.profesional !== null) {
    self.profesional = self.sData.profesional;
    self.profesional.fechaNacimiento = new Date(Date.parse(self.profesional.fechaNacimiento));
    self.profesional.consultorio = parseInt(self.profesional.consultorio);
    self.title = 'Editar Profesional';
    self.icon = 'fa-user';
  }
}