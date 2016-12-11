angular
  .module('Eps')
  .config(appConfig)
  .run(function($rootScope, $auth, $location, moment, eps) {

    $rootScope.currentPage = 'inicio';
    $rootScope.pageTitle = 'Inicio';
    $rootScope.pageIcon = 'fa-home';
    $rootScope.user = {};
    $rootScope.sesion = 'admin';
    $rootScope.date = moment().format('LL');
    $rootScope.signOut = function() {
      $auth.signOut()
        .then(function(resp) {
          console.log("signOut");
          $location.path('/login');
        })
        .catch(function(resp) {
          console.log("No signOut")
        });
    };
    eps.getUser()
      .then(function(res) {
        var resp = res.data.users;
        var pacientes = res.data.users.find(function(user) {
          return user.type === 'Patient';
        });
        console.log(pacientes);
      })


  })

function appConfig($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: '../../views/dashboard.html',
    controller: 'DashBoard',
    controllerAs: "vm"
  })

  $routeProvider.when('/login', {
    templateUrl: '../../views/login.html',
    controller: 'Login',
    controllerAs: "lo"
  })

  .when('/pacientes', {
    templateUrl: '../../views/pacientes.html',
    controller: 'Pacientes',
    controllerAs: "pa",
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

  .when('/profesionales', {
    templateUrl: '/views/profesionales.html',
    controller: 'Profesionales',
    controllerAs: "pro"
  })

  .when('/addProfesional', {
    templateUrl: '/views/addProfesional.html',
    controller: 'ProfesionalAdd',
    controllerAs: "proAdd"
  })

  .when('/admin', {
    templateUrl: '/views/administracion.html',
    controller: 'Admin',
    controllerAs: "ad"
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