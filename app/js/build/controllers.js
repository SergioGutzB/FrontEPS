function pacienteAddController(e,t){var n=this;n.sData=t,n.icon="fa-user-plus",n.title="Registrar Paciente",null!==n.sData.paciente&&(n.paciente=n.sData.paciente,n.paciente.fechaNacimiento=new Date(Date.parse(n.paciente.fechaNacimiento)),n.title="Editar Paciente",n.icon="fa-user")}function CitasController(){this.prueba="una prueba"}function DashBoardController(){}function hcController(e,t,n){var o=this;o.sData=t,null==o.sData.paciente&&n.path("/pacientes"),o.paciente=o.sData.paciente}function indexCotroller(e,t){this.close=function(){console.log("close")},e.currentPage=t.path().split("/")[1],this.go=function(n){e.currentPage=n,t.path("/"+n),""===n&&(e.currentPage="inicio")}}function pacientesController(e,t,n,o,i,a){function l(e,t){var n=this;n.sData=t,n.hide=function(){e.hide()},n.cancel=function(){e.cancel()},n.answer=function(t){e.hide(t)}}var r=this;r.sData=a,r.showAdvanced=function(e){r.getCurrentSelection()&&i.show({controller:l,controllerAs:"dialog",bindToController:!0,templateUrl:"/views/modalPaciente.html",parent:angular.element(document.body),targetEvent:e,clickOutsideToClose:!0,fullscreen:r.customFullscreen}).then(function(e){r.status='You said the information was "'+e+'".'},function(){r.status="You cancelled the dialog."})},r.seleccionable=!0,r.gridOptions={enableRowSelection:!1,enableRowHeaderSelection:!1,paginationPageSizes:[25,50,75],paginationPageSize:25,enablePaginationControls:!1,enableFiltering:!1,multiSelect:!1,modifierKeysToMultiSelect:!1,noUnselect:!0,onRegisterApi:function(e){r.gridApi=e,r.gridApi.grid.registerRowsProcessor(r.singleFilter,200)},columnDefs:[{field:"primerNombre"},{field:"segundoNombre"},{field:"primerApellido"},{field:"segundoApellido"},{field:"documento"},{field:"fechaNacimiento"},{field:"estadoCivil"}]},r.toggleRowSelection=function(){r.sData.paciente=null,r.gridApi.selection.clearSelectedRows(),r.gridOptions.enableRowSelection=!r.gridOptions.enableRowSelection,r.gridApi.core.notifyDataChange(n.dataChange.OPTIONS)},r.getCurrentSelection=function(){return r.sData.paciente=r.gridApi.selection.getSelectedRows()[0],console.log(r.sData.paciente),void 0!=r.sData.paciente},r.filter=function(){r.gridApi.grid.refresh()},r.singleFilter=function(e){var t=new RegExp(r.filterValue);return e.forEach(function(e){var n=!1;["primerNombre","segundoNombre","primerApellido","segundoApellido","documento"].forEach(function(o){e.entity[o].match(t)&&(n=!0)}),n||(e.visible=!1)}),e},e.$watch(function(){return r.filterValue},r.filter),e.$watch(function(){return r.seleccionable},r.toggleRowSelection),r.go=function(e){r.getCurrentSelection()&&o.path("/"+e)},r.goAdd=function(e){r.sData.paciente=null,o.path("/addPaciente")},r.gridOptions.data=a.pacientes,t(function(){r.gridApi.selection.selectRow(r.gridOptions.data[0]),r.gridApi.selection.clearSelectedRows()},0,1),l.$inject=["$mdDialog","sData"]}var eps=angular.module("Eps");eps.controller("PacienteAdd",pacienteAddController),pacienteAddController.$inject=["$scope","sData"];var eps=angular.module("Eps");eps.controller("Citas",CitasController),CitasController.$inject=[];var eps=angular.module("Eps");eps.controller("DashBoard",DashBoardController);var eps=angular.module("Eps");eps.controller("HC",hcController),hcController.$inject=["$scope","sData","$location"];var eps=angular.module("Eps");eps.controller("Index",indexCotroller),indexCotroller.$inject=["$rootScope","$location"];var eps=angular.module("Eps");eps.controller("Pacientes",pacientesController),pacientesController.$inject=["$scope","$interval","uiGridConstants","$location","$mdDialog","sData"];