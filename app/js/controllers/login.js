var eps = angular.module('Eps');
eps.controller('Login', loginController);
loginController.$inject = ['$rootScope', '$location', '$auth', 'CONFIG', 'ROLES', 'eps'];

function loginController($rootScope, $location, $auth, CONFIG, ROLES, eps) {
  var self = this;

  self.admin = {
    email: 'admin@gmail.com',
    password: "12345678",
    password_confirmation: "12345678",
    document: "12345678",
    type: "admin",
    name: "Administrador",
    last_name: "Administrador"
  };


  // $auth.submitLogin(self.admin)
  //   .then(function(resp) {
  //     console.log("registrado");
  //   });

  $auth.validateUser()
    .then(function() {
      console.log("redirecionando..");
      eps.getUsers()
        .then(function(response) {
          console.log(response.data);
        });
      eps.getProfesionales()
        .then(function(res) {
          console.log(res);
        });
      eps.getProfesional(1)
        .then(function(response) {
          console.log(response.data);
        }, function(error) {
          console.log(error);
        });
      $location.path('/');
    })
    .catch(function(resp) {
      console.log("no validate user..");
    });

  self.submitLogin = function() {
    $auth.submitLogin(self.loginForm)
      .then(function(resp) {
        console.log("logeado");
        console.log(resp);
        var user = resp;
        $rootScope.user = user;
        $rootScope.sesion = user.type;

        eps.getProfesional(1)
          .then(function(response) {
            console.log(response.data);
          }, function(error) {
            console.log(error);
          });

        eps.getUsers()
          .then(function(response) {
            console.log(response.data);
          });

        if (user.type == "admin") {
          $location.path('/');
          CONFIG.ROL_CURRENT_USER = 1;
        }
        if (user.type == "doctor") {
          $location.path('/citas_medicas');
          CONFIG.ROL_CURRENT_USER = 3;
        }
        if (user.type == "functionary") {
          $location.path('/citas_medicas');
          CONFIG.ROL_CURRENT_USER = 1;
        }
        if (user.type == "Patient") {
          $location.path('/citas_medicas');
          CONFIG.ROL_CURRENT_USER = 2;
        }
        CONFIG.ROL_CURRENT_USER = 3;
        $location.path('/');
      })
      .catch(function(resp) {
        console.log("No logeado");
      });
  };

  $rootScope.pageTitle = 'Login';
  $rootScope.pageIcon = '';
  $rootScope.currentPage = $location.path().split('/')[1];

}