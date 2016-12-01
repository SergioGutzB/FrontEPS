angular
  .module('Eps')
  .config(appConfig);

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

  .otherwise({
    redirectTo: '/'
  });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  // $locationProvider.html5Mode(true)
}