var eps = angular.module('Eps');
eps.controller('Pacientes', pacientesController);
pacientesController.$inject = ['$scope', '$rootScope', '$interval', 'uiGridConstants', '$location', '$mdDialog', 'sData', 'eps'];

function pacientesController($scope, $rootScope, $interval, uiGridConstants, $location, $mdDialog, sData, eps) {
  var self = this;
  self.sData = sData;
  $rootScope.pageTitle = 'Pacientes';
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
      { field: 'id' },
      { field: 'name' },
      { field: 'last_name' },
      { field: 'document' },
      { field: 'birthdate' },
      { field: 'phone' }
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
    console.log("selecionado");
    console.log(self.sData.patient);
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

  eps.getUser(2)
    .then(function(res) {
      console.log("usuario id:");
      console.log(res);
    });
  eps.getUsers()
    .then(function(res) {
      self.gridOptions.data = res.data.users.filter(function(user) {
        return user.type === 'Patient';
      });
      console.log(self.gridOptions.data)
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