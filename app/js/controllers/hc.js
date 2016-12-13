var eps = angular.module('Eps');
eps.controller('HC', hcController);
hcController.$inject = ['$scope', '$rootScope', 'sData', '$location', 'eps'];

function hcController($scope, $rootScope, sData, $location, eps) {
  var self = this;
  self.sData = sData;

  $rootScope.pageTitle = 'Historia Clínica';
  $rootScope.pageIcon = 'fa-address-card';

  var hc = {
    user_id: 2,
    valuation_format: {
      motivoConsulta: "esta loco",
      farmacologicos: "todos",
      efermedadesFamiliares: "todas",
      EnfermedadesPersonales: "mas",
      EnfermedadesPsiquiatricas: "ninguna",
      Medicamentos: "ninguna",
      DatosSocioDemograficos: "DatosSocio Demograficos",
      HallasgosImportantes: "Hallasgos Importantes",
      EvolucionPsicologia: "Evolucion Psicología",
      ImpresionDiagnostica: "Impresión Diagnostica",
      ConductaSeguir: "ConductaSeguir",
      Pruebas: "Pruebas",
      Diagnostico: "Diagnostico",
    },
    evolution_format: {
      Objetivo: "Objetivos",
      DesarrolloSesion: "Desarrollo Sesión",
      EvolucionPaciente: "Evolución Paciente",
      ConductaSeguir: "Conducta Seguir",
      DiagnosticoPrincipal: "Diagnostico Principal",
    },
    format_not_pos: {
      procedimientos: "procedimientos....",
    }
  };
  eps.addHc(hc)
    .then(function(response) {
      console.log(response);
    }, function(error) {
      console.log(error);
    });

  if (self.sData.paciente === null) {
    $location.path('/pacientes');
  }
  self.paciente = self.sData.paciente;
}