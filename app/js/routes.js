angular
  .module('Eps')
  .config(appConfig);

function appConfig($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/index.html',
      controller: 'Index',
      controller_as: "vm"
    })
    .otherwise({
      redirectTo: '/'
    });

  $routeProvider.otherwise({ redirectTo: '/' });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  // $locationProvider.html5Mode(true)
}