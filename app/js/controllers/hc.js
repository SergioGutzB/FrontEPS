var eps = angular.module('Eps');
eps.controller('HC', hcController);
hcController.$inject = ['$scope', '$rootScope', 'sData', '$location', 'eps', '$interval', 'uiGridConstants', '$mdToast', '$mdDialog'];

function hcController($scope, $rootScope, sData, $location, eps, $interval, uiGridConstants, $mdToast, $mdDialog) {
  var self = this;
  self.sData = sData;

  $rootScope.pageTitle = 'Historia Clínica';
  $rootScope.pageIcon = 'fa-address-card';

  self.hc_id = null;

  if (self.sData.patient !== null) {
    eps.getUser(self.sData.patient.id)
      .then(function(response) {
        self.patient = response.data;
        self.patient = $.extend(self.patient, { birthdate: moment(self.patient.birthdate)._d });
        // console.log("paciente: ", self.patient);
      }, function(error) {
        self.patient = self.sData.patient;
      });
  }

  function showSimpleToast(text) {
    $mdToast.show(
      $mdToast.simple()
      .textContent(text)
      .position("top right")
      .hideDelay(5000)
    );
  }

  self.addHc = function() {
    // console.log("añadiendo hc");
    var aditional = {
      fecha: new Date(),
      especialista: $rootScope.user.name + " " + $rootScope.user.last_name,
      especialidad: $rootScope.user.speciality,
      tp: $rootScope.user.medical_license,
    };
    self.hc = $.extend(self.hc, { user: self.sData.patient.id });

    if (!self.hc.valuation_format)
      self.hc.valuation_format = '{}';
    else {
      self.hc.valuation_format = JSON.stringify($.extend(self.hc.valuation_format, aditional));
    }
    if (!self.hc.evolution_format)
      self.hc.evolution_format = '{}';
    else {
      self.hc.evolution_format = JSON.stringify($.extend(self.hc.evolution_format, aditional));
    }
    if (!self.hc.format_not_pos)
      self.hc.format_not_pos = '{}';
    else {
      self.hc.format_not_pos = JSON.stringify($.extend(self.hc.format_not_pos, aditional));
    }

    console.log(self.hc);
    eps.addHc(self.hc)
      .then(function(response) {
        console.log(response);
        showSimpleToast("Historia Clínica Actulizada!");
        loadHCs();
      }, function(error) {
        console.log(error);
      });
  };

  Object.size = function(obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  function loadHCs() {
    eps.getHc(sData.patient.id)
      .then(function(response) {
        self.hcs = response.data.histories;
        // console.log(self.hcs);
        var data_aux = [];
        self.hcs.forEach(function(hc, idex) {
          // console.log("evolution_format lengh: ", Object.size(hc.evolution_format));
          // console.log("valuation_format lengh: ", Object.size(hc.valuation_format));
          var aux;
          if (Object.size(hc.evolution_format) > 0) {
            aux = hc.evolution_format;
            aux.fecha = moment(hc.evolution_format.fecha).format("LLL");
            data_aux.push($.extend(aux, { format: 'Evolución' }));
          }
          if (Object.size(hc.format_not_pos) > 0) {
            aux = hc.format_not_pos;
            aux.fecha = moment(hc.format_not_pos.fecha).format("LLL");
            data_aux.push($.extend(aux, { format: 'No POS' }));
          }
          if (Object.size(hc.valuation_format) > 0) {
            aux = hc.valuation_format;
            aux.fecha = moment(hc.valuation_format.fecha).format("LLL");
            data_aux.push($.extend(aux, { format: 'Valoración Inicial' }));
          }
        });
        self.gridHCOptions.data = data_aux;
      }, function(error) {
        console.log(error);
      });
  }
  loadHCs();
  if (self.sData.paciente === null) {
    $location.path('/pacientes');
  }
  self.paciente = self.sData.paciente;


  // ########################################
  // Cargar datos para tabla RESUMEN HCs
  // ########################################  

  self.gridHCOptions = {
    enableRowSelection: true,
    enableRowHeaderSelection: false,
    enableFiltering: false,
    multiSelect: false,
    modifierKeysToMultiSelect: false,
    noUnselect: true,
    onRegisterApi: function(gridHCApi) {
      self.gridHCApi = gridHCApi;
    },
    columnDefs: [
      { field: 'especialista', displayName: 'Especialista' },
      { field: 'especialidad', displayName: 'Especialidad' },
      { field: 'fecha', displayName: 'Fecha' },
      { field: 'tp', displayName: 'T.P.' },
      { field: 'format', displayName: 'Consulta' },
    ]
  };

  self.toggleRowSelection = function() {
    self.sData.patient = null;
    self.gridHCApi.selection.clearSelectedRows();
    self.gridHCOptions.enableRowSelection = !self.gridHCOptions.enableRowSelection;
    self.gridHCApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
  };

  self.getCurrentSelection = function() {
    self.hc_id = self.gridHCApi.selection.getSelectedRows()[0];
    // console.log("selecionado");
    // console.log(self.hc_id);
    if (self.hc_id)
      return true;
    else return false;
  };

  $interval(function() {
    self.gridHCApi.selection.selectRow(self.gridHCOptions.data[0]);
    self.gridHCApi.selection.clearSelectedRows();
  }, 0, 1);


  // ########################################
  // Modal Registrar Especialidad
  // ########################################
  self.showModalHC = function(ev) {
    if (self.getCurrentSelection())
      $mdDialog.show({
        controller: DialogHistoriaController,
        controllerAs: 'dHC',
        bindToController: true,
        templateUrl: '/views/modalHistoria.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
        self.status = 'You said the information was "' + answer + '".';
      }, function() {
        self.status = 'You cancelled the dialog.';
      });
  };

  DialogHistoriaController.$inject = ['$mdDialog', 'sData', 'eps'];

  function DialogHistoriaController($mdDialog, sData, eps) {
    this.hc = self.hc_id;
    this.hide = function() {
      $mdDialog.hide();
    };
    this.cancel = function() {
      $mdDialog.cancel();
    };
    this.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }


}