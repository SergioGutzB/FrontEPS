var eps = angular.module('Eps');
eps.controller('ProfesionalAdd', profesionalAddController);
profesionalAddController.$inject = ['$scope', '$rootScope', 'sData'];

function profesionalAddController($scope, $rootScope, sData) {
  var self = this;
  self.sData = sData;

  $rootScope.pageTitle = 'Registrar Profesional';
  $rootScope.pageIcon = 'fa-user-md';

  if (self.sData.profesional !== null) {
    self.profesional = self.sData.profesional;
    self.profesional.fechaNacimiento = new Date(Date.parse(self.profesional.fechaNacimiento));
    self.profesional.consultorio = parseInt(self.profesional.consultorio);
    self.title = 'Editar Profesional';
    self.icon = 'fa-user';
  }
}