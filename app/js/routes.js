angular
  .module('Eps')
  .config(appConfig)
  .run(function($rootScope) {
    $rootScope.currentPage = 'inicio';
  })

function appConfig($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: '../../views/dashboard.html',
    controller: 'DashBoard',
    controllerAs: "vm"
  })

  .when('/pacientes', {
    templateUrl: '../../views/pacientes.html',
    controller: 'Pacientes',
    controllerAs: "pa"
  })

  .when('/citas_medicas', {
    templateUrl: '../../views/citas.html',
    controller: 'Citas',
    controllerAs: "ci"
  })

  .when('/addPaciente', {
    templateUrl: '../../views/addPaciente.html',
    controller: 'PacienteAdd',
    controllerAs: "padd"
  })

  .when('/hc', {
    templateUrl: '/views/historia_clinica.html',
    controller: 'HC',
    controllerAs: "hc"
  })


  .otherwise({
    redirectTo: '/'
  });

  if (window.history && window.history.pushState) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }
}