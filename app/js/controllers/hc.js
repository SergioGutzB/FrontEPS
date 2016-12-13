var eps = angular.module('Eps');
eps.controller('HC', hcController);
hcController.$inject = ['$scope', '$rootScope', 'sData', '$location', 'eps'];

function hcController($scope, $rootScope, sData, $location, eps) {
  var self = this;
  self.sData = sData;

  $rootScope.pageTitle = 'Historia Clínica';
  $rootScope.pageIcon = 'fa-address-card';

  if (self.sData.patient !== null) {
    eps.getUser(self.sData.patient.id)
      .then(function(response) {
        self.patient = response.data;
        console.log("paciente: ", self.patient);
      }, function(error) {
        self.patient = self.sData.patient;
      });
  }

  self.addHc = function() {
    console.log("añadiendo hc")
    self.hc = $.extend(self.hc, { user: self.sData.patient.id });
    self.hc.valuation_format = JSON.stringify(self.hc.valuation_format);
    self.hc.evolution_format = JSON.stringify(self.hc.evolution_format);
    self.hc.format_not_pos = JSON.stringify(self.hc.format_not_pos);

    if (!self.hc.valuation_format)
      self.hc.valuation_format = '{}';
    if (!self.hc.evolution_format)
      self.hc.evolution_format = '{}';
    if (!self.hc.format_not_pos)
      self.hc.format_not_pos = '{}';

    console.log(self.hc)
    eps.addHc(self.hc)
      .then(function(response) {
        console.log(response);
      }, function(error) {
        console.log(error);
      });
  }

  if (self.sData.paciente === null) {
    $location.path('/pacientes');
  }
  self.paciente = self.sData.paciente;
}