var eps = angular.module('Eps');
eps.controller('PacienteAdd', pacienteAddController);
pacienteAddController.$inject = ['$scope', '$rootScope', 'sData', 'eps', '$mdToast', '$mdDialog'];

function pacienteAddController($scope, $rootScope, sData, eps, $mdToast, $mdDialog) {
  var self = this;
  self.sData = sData;

  $rootScope.pageTitle = 'Registrar Paciente';
  $rootScope.pageIcon = 'fa-user-plus';

  var reset = function(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
    self.patient = {
      type: 'patient',
      email: "",
      password: "",
      password_confirmation: "",
      document: "",
      name: "",
      last_name: "",
      gender: "",
      birthdate: "",
      phone: "",
      aditional_information: {
        blood_type: "",
        civil_status: "",
        occupation: "",
        live_with: "",
        religion: "",
        companion: "",
        place_of_birth: "",
        municipality: "",
        city: "",
        address: "",
        cellphone: "",
        ethnicity: "",
        education_level: "",
        state: "",
      }
    };
  };

  reset();

  if (self.sData.patient !== null) {
    console.log(self.sData.patient.id);
    eps.getUser(self.sData.patient.id)
      .then(function(response) {
        console.log(response.data);
        self.patient = response.data;
      }, function(error) {
        self.patient = self.sData.patient;
      });
    // self.patient.fechaNacimiento = new Date(Date.parse(self.patient.fechaNacimiento));
    self.title = 'Editar Paciente';
    self.icon = 'fa-user';
  }

  var showSimpleToast = function() {
    $mdToast.show(
      $mdToast.simple()
      .textContent('Paciente registrado!')
      .position("top right")
      .hideDelay(3000)
    );
  };

  var showAlert = function(ev) {
    $mdDialog.show(
      $mdDialog.alert()
      .parent(angular.element(document.querySelector('#popupContainer')))
      .clickOutsideToClose(true)
      .title('Error de registro')
      .textContent('No ha sido posible registrar el paciente, intente nuevamente.')
      .ariaLabel('Error registro de paciente')
      .ok('Volver')
      .targetEvent(ev)
    );
  };

  self.save = function(form) {
    var patient = {
      type: self.patient.type,
      email: self.patient.email,
      password: self.patient.document,
      password_confirmation: self.patient.document,
      document: self.patient.document,
      name: self.patient.name,
      last_name: self.patient.last_name,
      gender: self.patient.gender,
      birthdate: self.patient.birthdate,
      phone: self.patient.phone,

      blood_type: self.patient.additional_information_user.blood_type,
      civil_status: self.patient.additional_information_user.civil_status,
      occupation: self.patient.additional_information_user.occupation,
      live_with: self.patient.additional_information_user.live_with,
      religion: self.patient.additional_information_user.religion,
      companion: self.patient.additional_information_user.companion,
      place_of_birth: self.patient.additional_information_user.place_of_birth,
      state: self.patient.additional_information_user.state,
      municipality: self.patient.additional_information_user.municipality,
      city: self.patient.additional_information_user.city,
      address: self.patient.additional_information_user.address,
      cellphone: self.patient.additional_information_user.cellphone,
      ethnicity: self.patient.additional_information_user.ethnicity,
      education_level: self.patient.additional_information_user.education_level,

    };
    if (self.patient.attendants)
      var attendants = {
        document: self.patient.attendants.document,
        name: self.patient.attendants.name,
        last_name: self.patient.attendants.last_name,
        address: self.patient.attendants.address,
        relationship: self.patient.attendants.relationship,
        phone: self.patient.attendants.phone,
        user: self.patientdocument
      };

    eps.addPatient(patient)
      .then(function(response) {
        if (response.data.status == "ok") {
          showSimpleToast();
          reset(form);
        }
      }, function(error) {
        showAlert($event);
      });
  };
}