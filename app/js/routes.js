angular
  .module('Eps')
  .config(appConfig)

function appConfig($routeProvider, $locationProvider, CONFIG, ROLES) {
  $routeProvider.when('/', {
    templateUrl: CONFIG.TEMPLATE_DIR + 'dashboard.html',
    controller: 'DashBoard',
    controllerAs: "vm",
    data: {
      authorized: [ROLES.ADMIN.ROL, ROLES.PATIENT.ROL, ROLES.PROFESIONAL.ROL]
    }
  })

  $routeProvider.when('/login', {
    templateUrl: CONFIG.TEMPLATE_DIR + 'login.html',
    controller: 'Login',
    controllerAs: "lo",
    data: {
      authorized: [ROLES.ANONYMOUS.ROL]
    }
  })

  .when('/pacientes', {
    templateUrl: CONFIG.TEMPLATE_DIR + 'pacientes.html',
    controller: 'Pacientes',
    controllerAs: "pa",
    data: {
      authorized: [ROLES.ADMIN.ROL, ROLES.PATIENT.ROL, ROLES.PROFESIONAL.ROL]
    }
  })

  .when('/citas_medicas', {
    templateUrl: CONFIG.TEMPLATE_DIR + 'citas.html',
    controller: 'Citas',
    controllerAs: "ci",
    data: {
      authorized: [ROLES.ADMIN.ROL, ROLES.PROFESIONAL.ROL]
    }
  })

  .when('/addPaciente', {
    templateUrl: CONFIG.TEMPLATE_DIR + 'addPaciente.html',
    controller: 'PacienteAdd',
    controllerAs: "padd",
    data: {
      authorized: [ROLES.ADMIN.ROL]
    }
  })

  .when('/hc', {
    templateUrl: CONFIG.TEMPLATE_DIR + 'historia_clinica.html',
    controller: 'HC',
    controllerAs: "hc",
    data: {
      authorized: [ROLES.PROFESIONAL.ROL]
    }
  })

  .when('/profesionales', {
    templateUrl: CONFIG.TEMPLATE_DIR + 'profesionales.html',
    controller: 'Profesionales',
    controllerAs: "pro",
    data: {
      authorized: [ROLES.ADMIN.ROL]
    }
  })

  .when('/addProfesional', {
    templateUrl: CONFIG.TEMPLATE_DIR + 'addProfesional.html',
    controller: 'ProfesionalAdd',
    controllerAs: "proAdd",
    data: {
      authorized: [ROLES.ADMIN.ROL, ROLES.PROFESIONAL.ROL]
    }
  })

  .when('/admin', {
    templateUrl: CONFIG.TEMPLATE_DIR + 'administracion.html',
    controller: 'Admin',
    controllerAs: "ad",
    data: {
      authorized: [ROLES.ADMIN.ROL]
    }
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