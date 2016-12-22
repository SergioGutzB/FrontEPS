var eps = angular.module('Eps');
eps.controller('ProfesionalAdd', profesionalAddController);
profesionalAddController.$inject = ['$scope', '$rootScope', 'sData', 'eps', '$mdToast', '$mdDialog', '$location'];

function profesionalAddController($scope, $rootScope, sData, eps, $mdToast, $mdDialog, $location) {
  var self = this;
  self.sData = sData;

  $rootScope.pageTitle = 'Registrar Profesional';
  $rootScope.pageIcon = 'fa-user-md';

  self.dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  self.searchTerm = '';
  self.clearSearchTerm = function() {
    self.searchTerm = '';
  };
  self.especialidades = {};
  eps.getServices()
      .then(function(response) {
        self.especialidades = response.data.services;
      });

  var showSimpleToast = function() {
    $mdToast.show(
      $mdToast.simple()
      .textContent('Profesional registrado!')
      .position("top right")
      .hideDelay(6000)
    );
  };

  var showAlert = function(ev) {
    $mdDialog.show(
      $mdDialog.alert()
      .parent(angular.element(document.querySelector('#popupContainer')))
      .clickOutsideToClose(true)
      .title('Error de registro')
      .textContent('No ha sido posible registrar el Profesional, intente nuevamente.')
      .ariaLabel('Error registro de Profesional')
      .ok('Volver')
      .targetEvent(ev)
    );
  };

  var reset = function(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
    self.profesional = {};
  };

  reset();

  if (self.sData.profesional !== null) {
    self.profesional = self.sData.profesional;
    self.profesional.fechaNacimiento = new Date(Date.parse(self.profesional.fechaNacimiento));
    self.profesional.consultorio = parseInt(self.profesional.consultorio);
    self.title = 'Editar Profesional';
    self.icon = 'fa-user';
  }

  self.save = function(form) {
    var profesional = {
      birthdate: self.profesional.birthdate,
      gender: self.profesional.gender,
      last_name: self.profesional.last_name,
      name: self.profesional.name,
      phone: self.profesional.phone,
      email: self.profesional.email,
      password: self.profesional.document,
      password_confirmation: self.profesional.document,
      document: self.profesional.document,
      type: "doctor",
      speciality: self.profesional.speciality,
      medical_license: self.profesional.medical_license,
      schedule: self.profesional.startsAt + ' - ' + self.profesional.endsAt,
      worked_days: self.profesional.worked_days
    };

    eps.addProfesional(profesional)
      .then(function(response) {
        showSimpleToast();
        reset(form);
        $location.path('/profesionales');
      }, function(error) {
        console.log(error);
        showAlert($event);
      });
  };
}