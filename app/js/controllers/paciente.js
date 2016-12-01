var eps = angular.module('Eps');
eps.controller('Pacientes', pacientesController);
pacientesController.$inject = ['$interval', 'uiGridConstants'];

function pacientesController($interval, uiGridConstants) {
  var self = this;

  self.gridOptions = {
    enableRowSelection: true,
    enableRowHeaderSelection: false,
    paginationPageSizes: [25, 50, 75],
    paginationPageSize: 25,
    enablePaginationControls: false,
    enableFiltering: false,
    onRegisterApi: function(gridApi) {
      self.gridApi = gridApi;
      self.gridApi.grid.registerRowsProcessor(self.singleFilter, 200);
    },
    columnDefs: [
      { field: 'nombre' },
      { field: 'segundoNombre' },
      { field: 'apellidoPaterno' },
      { field: 'documento' },
      { field: 'cumpleaños' },
      { field: 'estadoCivil' },
      { field: 'ciudadOrigen' }
    ]
  };

  self.gridOptions.multiSelect = false;
  self.gridOptions.modifierKeysToMultiSelect = false;
  self.gridOptions.noUnselect = true;

  self.filter = function() {
    self.gridApi.grid.refresh();
  };

  self.singleFilter = function(renderableRows) {
    var matcher = new RegExp(self.filterValue);
    renderableRows.forEach(function(row) {
      var match = false;
      ['nombre', 'segundoNombre', 'apellidoPaterno'].forEach(function(field) {
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




  var data = [{
    "nombre": 'Sergio',
    "segundoNombre": 'Alexander',
    "apellidoPaterno": 'Gutiérrez',
    "apellidoMaterno": 'Bustos',
    "documento": '1016012390',
    "cumpleaños": '18/05/1988',
    "ciudadOrigen": 'Bogotá D.C',
    "estadoCivil": 'Soltero',
    "telefono1": '3138315841',
    "telefono2": '5265086',
    "direccion": 'Cra. 7G 150 25 Apto:401',
    "ciudad": 'Bogotá D.C',
  }, {
    "nombre": 'Luz',
    "segundoNombre": 'Alexander',
    "apellidoPaterno": 'Gutiérrez',
    "apellidoMaterno": 'Bustos',
    "documento": '1016012390',
    "cumpleaños": '18/05/1988',
    "ciudadOrigen": 'Bogotá D.C',
    "estadoCivil": 'Soltero',
    "telefono1": '3138315841',
    "telefono2": '5265086',
    "direccion": 'Cra. 7G 150 25 Apto:401',
    "ciudad": 'Bogotá D.C',
  }, ];

  self.gridOptions.data = data;
  $interval(function() { self.gridApi.selection.selectRow(self.gridOptions.data[0]); }, 0, 1);

}