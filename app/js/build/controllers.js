function CitasController(){this.prueba="una prueba"}function DashBoardController(){}function indexCotroller(e){this.close=function(){console.log("close")},this.go=function(o){e.path(o)}}function pacientesController(e,o){var i=this;i.gridOptions={enableRowSelection:!0,enableRowHeaderSelection:!1,paginationPageSizes:[25,50,75],paginationPageSize:25,enablePaginationControls:!1,enableFiltering:!1,onRegisterApi:function(e){i.gridApi=e,i.gridApi.grid.registerRowsProcessor(i.singleFilter,200)},columnDefs:[{field:"nombre"},{field:"segundoNombre"},{field:"apellidoPaterno"},{field:"documento"},{field:"cumpleaños"},{field:"estadoCivil"},{field:"ciudadOrigen"}]},i.gridOptions.multiSelect=!1,i.gridOptions.modifierKeysToMultiSelect=!1,i.gridOptions.noUnselect=!0,i.filter=function(){i.gridApi.grid.refresh()},i.singleFilter=function(e){var o=new RegExp(i.filterValue);return e.forEach(function(e){var i=!1;["nombre","segundoNombre","apellidoPaterno"].forEach(function(n){e.entity[n].match(o)&&(i=!0)}),i||(e.visible=!1)}),e};var n=[{nombre:"Sergio",segundoNombre:"Alexander",apellidoPaterno:"Gutiérrez",apellidoMaterno:"Bustos",documento:"1016012390","cumpleaños":"18/05/1988",ciudadOrigen:"Bogotá D.C",estadoCivil:"Soltero",telefono1:"3138315841",telefono2:"5265086",direccion:"Cra. 7G 150 25 Apto:401",ciudad:"Bogotá D.C"},{nombre:"Luz",segundoNombre:"Alexander",apellidoPaterno:"Gutiérrez",apellidoMaterno:"Bustos",documento:"1016012390","cumpleaños":"18/05/1988",ciudadOrigen:"Bogotá D.C",estadoCivil:"Soltero",telefono1:"3138315841",telefono2:"5265086",direccion:"Cra. 7G 150 25 Apto:401",ciudad:"Bogotá D.C"}];i.gridOptions.data=n,e(function(){i.gridApi.selection.selectRow(i.gridOptions.data[0])},0,1)}var eps=angular.module("Eps");eps.controller("Citas",CitasController);var eps=angular.module("Eps");eps.controller("DashBoard",DashBoardController);var eps=angular.module("Eps");eps.controller("Index",["$location",indexCotroller]);var eps=angular.module("Eps");eps.controller("Pacientes",pacientesController),pacientesController.$inject=["$interval","uiGridConstants"];