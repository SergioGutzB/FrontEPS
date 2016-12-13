var eps = angular.module('Eps');
eps.controller('Profesionales', profesionalesController);
profesionalesController.$inject = ['$scope', '$rootScope', '$interval', 'uiGridConstants', '$location', '$mdDialog', 'sData', 'eps'];

function profesionalesController($scope, $rootScope, $interval, uiGridConstants, $location, $mdDialog, sData, eps) {
  var self = this;
  self.sData = sData;

  self.seleccionable = true;
  self.filterValue = '';

  $rootScope.pageTitle = 'Pacientes';
  $rootScope.pageIcon = 'fa-user-md';

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
      { field: 'name' },
      { field: 'last_name' },
      { field: 'document' },
      { field: 'birthdate' },
      { field: 'speciality' },
      { field: 'consultorio' },
    ]
  };

  self.toggleRowSelection = function() {
    self.sData.profesional = null;
    self.gridApi.selection.clearSelectedRows();
    self.gridOptions.enableRowSelection = !self.gridOptions.enableRowSelection;
    self.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
  };

  self.getCurrentSelection = function() {
    self.sData.profesional = self.gridApi.selection.getSelectedRows()[0];
    if (self.sData.profesional !== undefined)
      return true;
    else return false;
  };

  self.filter = function() {
    if (self.filterValue)
      self.gridApi.grid.refresh();
  };

  self.singleFilter = function(renderableRows) {
    var matcher = new RegExp(self.filterValue);
    renderableRows.forEach(function(row) {
      var match = false;
      ['name', 'last_name', 'document', 'speciality'].forEach(function(field) {
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
    self.sData.profesional = null;
    $location.path('/addProfesional');
  };

  eps.getProfesionales()
    .then(function(res) {
      console.log(res);
    }, function(error) {
      console.log("error..");
      console.log(error);
    });

  eps.getProfesional(1)
    .then(function(response) {
      console.log(response);
    }, function(error) {
      console.log(error);
    });

  self.gridOptions.data = self.sData.profesionales;

  $interval(function() {
    self.gridApi.selection.selectRow(self.gridOptions.data[0]);
    self.gridApi.selection.clearSelectedRows();
  }, 0, 1);
}