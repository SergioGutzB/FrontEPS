var eps = angular.module('Eps');
eps.controller('Pacientes', pacientesController);
pacientesController.$inject = ['$scope', '$rootScope', '$interval', 'uiGridConstants', '$location', '$mdDialog', 'sData', 'eps'];

function pacientesController($scope, $rootScope, $interval, uiGridConstants, $location, $mdDialog, sData, eps) {
  var self = this;
  self.sData = sData;
  $rootScope.pageIcon = 'fa-users';

  self.showAdvanced = function(ev) {
    if (self.getCurrentSelection())
      $mdDialog.show({
        controller: DialogController,
        controllerAs: 'dialog',
        bindToController: true,
        templateUrl: '/views/modalPaciente.html',
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

  self.seleccionable = true;

  self.gridOptions = {
    enableRowSelection: false,
    enableRowHeaderSelection: false,
    paginationPageSizes: [25, 50, 75],
    paginationPageSize: 25,
    enablePaginationControls: false,
    enableFiltering: false,
    multiSelect: false,
    modifierKeysToMultiSelect: false,
    noUnselect: true,
    onRegisterApi: function(gridApi) {
      self.gridApi = gridApi;
      self.gridApi.grid.registerRowsProcessor(self.singleFilter, 200);
    },
    columnDefs: [
      { field: 'id', displayName: 'ID' },
      { field: 'name', displayName: 'Nombres' },
      { field: 'last_name', displayName: 'Apellidos' },
      { field: 'document', displayName: 'Documento' },
      { field: 'birthdate', displayName: 'Fecha nacimiento' },
      { field: 'phone', displayName: 'Teléfono' }
    ]
  };

  self.toggleRowSelection = function() {
    self.sData.patient = null;
    self.gridApi.selection.clearSelectedRows();
    self.gridOptions.enableRowSelection = !self.gridOptions.enableRowSelection;
    self.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
  };

  self.getCurrentSelection = function() {
    self.sData.patient = self.gridApi.selection.getSelectedRows()[0];
    // console.log("selecionado");
    // console.log(self.sData.patient);
    if (self.sData.patient !== undefined)
      return true;
    else return false;

  };

  self.filter = function() {
    self.gridApi.grid.refresh();
  };

  self.singleFilter = function(renderableRows) {
    var matcher = new RegExp(self.filterValue);
    renderableRows.forEach(function(row) {
      var match = false;
      ['document', 'name', 'last_name'].forEach(function(field) {
        if (row.entity[field].match(matcher)) {
          match = true;
        }
      });
      if (!match) {
        row.visible = false;
      }
    });
    return renderableRows;
  };

  $scope.$watch(function() {
    return self.filterValue;
  }, self.filter);

  $scope.$watch(function() {
    return self.seleccionable;
  }, self.toggleRowSelection);

  self.go = function(url) {
    if (self.getCurrentSelection())
      $location.path('/' + url);
  };

  self.goAdd = function(url) {
    self.sData.patient = null;
    $location.path('/addPaciente');
  };
  var data;
  eps.getUsers()
    .then(function(res) {
      // console.log("res user ", res.data.users);

      if ($rootScope.sesion === 'Functionary') {
        data = res.data.users.filter(function(user) {
          return user.type === 'Patient';
        });
        $rootScope.pageTitle = 'Pacientes';
        // console.log('gridOptions: ', data);
        if (data)
          self.gridOptions.data = data.map(function(patient) {
            patient.birthdate = moment(patient.birthdate).format('L');
            return patient;
          });
      } else if ($rootScope.sesion === 'Doctor') {
        $rootScope.pageTitle = 'Pacientes Asignados';
        eps.getCites()
          .then(function(response) {
            // console.log("cites: ", response.data.cites);
            var patient = response.data.cites.filter(function(cite) {
              return cite.doctor.id === $rootScope.user.doctor_id;
            });
            // console.log("patient: ", patient);
            data = patient.map(function(cite) {
              return cite.patient;
            });
            // console.log('gridOptions: ', data);
            if (data)
              self.gridOptions.data = data.map(function(patient) {
                patient.birthdate = moment(patient.birthdate).format('L');
                return patient;
              });

          });
      }


    });


  $interval(function() {
    self.gridApi.selection.selectRow(self.gridOptions.data[0]);
    self.gridApi.selection.clearSelectedRows();
  }, 0, 1);

  DialogController.$inject = ['$mdDialog', 'sData'];

  function DialogController($mdDialog, sData) {
    var self = this;
    self.sData = sData;
    self.hide = function() {
      $mdDialog.hide();
    };
    self.cancel = function() {
      $mdDialog.cancel();
    };
    self.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }


}