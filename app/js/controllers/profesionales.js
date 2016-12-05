var eps = angular.module('Eps');
eps.controller('Profesionales', profesionalesController);
profesionalesController.$inject = ['$scope', '$interval', 'uiGridConstants', '$location', '$mdDialog', 'sData'];

function profesionalesController($scope, $interval, uiGridConstants, $location, $mdDialog, sData) {
  var self = this;
  self.sData = sData;

  self.seleccionable = true;
  self.filterValue = '';

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
      { field: 'primerNombre' },
      { field: 'primerApellido' },
      { field: 'segundoApellido' },
      { field: 'documento' },
      { field: 'especialidad' },
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
    if (self.sData.profesional != undefined)
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
      ['primerNombre', 'primerApellido', 'segundoApellido', 'documento', 'especialidad'].forEach(function(field) {
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

  self.gridOptions.data = self.sData.profesionales;

  $interval(function() {
    self.gridApi.selection.selectRow(self.gridOptions.data[0]);
    self.gridApi.selection.clearSelectedRows();
  }, 0, 1);
}