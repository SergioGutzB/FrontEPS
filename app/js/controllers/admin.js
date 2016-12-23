var eps = angular.module('Eps');
eps.controller('Admin', adminController);
adminController.$inject = ['$scope', '$rootScope', 'sData', '$location', 'eps', '$interval', 'uiGridConstants', '$mdDialog', '$mdToast'];

function adminController($scope, $rootScope, sData, $location, eps, $interval, uiGridConstants, $mdDialog, $mdToast) {
  var self = this;
  self.sData = sData;
  $rootScope.currenPage = 'admin';
  $rootScope.pageTitle = 'Administración';
  $rootScope.pageIcon = 'fa-cog';


  // ########################################
  // Cargar datos de Usuario funcionarios.
  // ########################################

  self.gridUserOptions = {
    enableRowSelection: true,
    enableRowHeaderSelection: false,
    enableFiltering: false,
    multiSelect: false,
    modifierKeysToMultiSelect: false,
    noUnselect: true,
    onRegisterApi: function(gridUserApi) {
      self.gridUserApi = gridUserApi;
    },
    columnDefs: [
      { field: 'id' },
      { field: 'document' },
    ]
  };

  self.toggleRowSelection = function() {
    self.sData.patient = null;
    self.gridUserApi.selection.clearSelectedRows();
    self.gridUserOptions.enableRowSelection = !self.gridUserOptions.enableRowSelection;
    self.gridUserApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
  };

  loadFuncionarios();

  $interval(function() {
    self.gridUserApi.selection.selectRow(self.gridUserOptions.data[0]);
    self.gridUserApi.selection.clearSelectedRows();
  }, 0, 1);

  // ########################################
  // Cargar datos de especialidades
  // ########################################

  self.gridEspOptions = {
    enableRowSelection: true,
    enableRowHeaderSelection: false,
    enableFiltering: false,
    multiSelect: false,
    modifierKeysToMultiSelect: false,
    noUnselect: true,
    onRegisterApi: function(gridEspApi) {
      self.gridEspApi = gridEspApi;
    },

    columnDefs: [
      { field: 'id' },
      { field: 'name' }
    ]
  };

  self.toggleRowSelection = function() {
    self.sData.patient = null;
    self.gridEspApi.selection.clearSelectedRows();
    self.gridEspOptions.enableRowSelection = !self.gridEspOptions.enableRowSelection;
    self.gridEspApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
  };

  loadEpscialidades();


  $interval(function() {
    self.gridEspApi.selection.selectRow(self.gridEspOptions.data[0]);
    self.gridEspApi.selection.clearSelectedRows();
  }, 0, 1);

  function loadEpscialidades() {
    eps.getServices()
      .then(function(response) {
        // console.log(response.data);
        self.gridEspOptions.data = response.data.services;
        // console.log(self.gridEspOptions.data);
      });
  }

  function loadFuncionarios() {
    eps.getUsers()
      .then(function(response) {
        // console.log(response.data);
        self.gridUserOptions.data = response.data.users.filter(function(user) {
          return user.type === 'Functionary';
        });
        // console.log(self.gridUserOptions.data);
      });
  }

  function showSimpleToast(text) {
    $mdToast.show(
      $mdToast.simple()
      .textContent(text)
      .position("top right")
      .hideDelay(6000)
    );
  }


  // ########################################
  // Modal Registrar Especialidad
  // ########################################
  self.showModalEspecialidad = function(ev) {
    $mdDialog.show({
        controller: DialogEspController,
        controllerAs: 'dEsp',
        bindToController: true,
        templateUrl: '/views/modalEspecialidad.html',
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

  DialogEspController.$inject = ['$mdDialog', 'sData', 'eps'];

  function DialogEspController($mdDialog, sData, eps) {
    var self = this;
    self.eps = {
      name: "",
      fieldsFV: ['motivo', 'farmacologicos', 'enFamiliares', 'enPersonales', 'enPsiquiatricas', 'medicamentos',
        'demograficos', 'hallasgos', 'evPsicologica', 'impresionDiagnostica', 'condutaSeguir', 'pruebas', 'diagnostico'
      ],
      fieldsFE: ['objetivo', 'sesion', 'evolucion', 'condutaSeguir', 'diagnostico'],
      fieldsNPOS: ['procedimientos']
    };

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

    self.addEspecialidad = function() {
      // console.log(self.eps);
      eps.addServices(self.eps)
        .then(function(response) {
          // console.log(response);
          loadEpscialidades();
          self.hide();
          showSimpleToast("Especialidad Registrada!");
        });
    };
  }

  // ########################################
  // Modal Registrar Funcionario
  // ######################################## 

  self.showModalFuncionario = function(ev) {
    $mdDialog.show({
        controller: DialogFunController,
        controllerAs: 'dFun',
        bindToController: true,
        templateUrl: '/views/modalFuncionario.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false,
        fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
        self.status = 'You said the information was "' + answer + '".';
      }, function() {
        self.status = 'You cancelled the dialog.';
      });
  };

  DialogFunController.$inject = ['$mdDialog', 'sData', 'eps', '$mdToast'];

  function DialogFunController($mdDialog, sData, eps, $mdToast) {
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

    self.funcionario = null;

    self.save = function() {
      if (self.funcionario) {
        var funcionario = self.funcionario;
        $.extend(funcionario, { type: 'functionary' });
        // console.log(funcionario);
        eps.addProfesional(funcionario)
          .then(function(response) {
            self.hide();
            loadFuncionarios();
            showSimpleToast("Funcionario Registrado!");
          });
      }
    };
  }
}