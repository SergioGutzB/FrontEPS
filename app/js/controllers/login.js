var eps = angular.module('Eps');
eps.controller('Login', loginController);
loginController.$inject = ['$rootScope', '$location', '$auth', 'CONFIG', 'ROLES', 'eps'];

function loginController($rootScope, $location, $auth, CONFIG, ROLES, eps) {
  var self = this;

  self.admin = {
    email: 'admin2@gmail.com',
    password: "1234567",
    password_confirmation: "1234567",
    document: "1234567",
    type: "admin",
    name: "Administrador",
    last_name: "Administrador",
    nickname: "1234567"
  };

  // $auth.submitRegistration(self.admin)
  //   .then(function(resp) {
  //     console.log("registrado");
  //   });

  $auth.validateUser()
    .then(function() {
      console.log("redirecionando..");
      // eps.getUsers()
      //   .then(function(response) {
      //     console.log(response.data);
      //   });
      // eps.getProfesionales()
      //   .then(function(res) {
      //     console.log(res);
      //   });
      // eps.getProfesional(1)
      //   .then(function(response) {
      //     console.log(response.data);
      //   }, function(error) {
      //     console.log(error);
      //   });
      $location.path('/');
    })
    .catch(function(resp) {
      console.log("no validate user..");
    });

  self.submitLogin = function() {
    $auth.submitLogin(self.loginForm)
      .then(function(response) {
        console.log("logeado");
        var id = response.id;

        eps.getUser(id)
          .then(function(response) {
            var user = response.data;
            $rootScope.user = user;
            $rootScope.sesion = user.type;
            if (user.type === null) {
              $location.path('/citas_medicas');
              CONFIG.ROL_CURRENT_USER = 3;
            }
            if (user.type === "Functionary") {
              $location.path('/citas_medicas');
              CONFIG.ROL_CURRENT_USER = 4;
            }
            if (user.type === "Patient") {
              $location.path('/citas_medicas');
              CONFIG.ROL_CURRENT_USER = 2;
            }
            if (user.type === "Admin") {
              $location.path('/');
              CONFIG.ROL_CURRENT_USER = 1;
            }
          })
          .catch(function(error) {

          });
      })
      .catch(function(resp) {
        console.log("No logeado");
      });
  };
  $rootScope.pageTitle = 'Login';
  $rootScope.pageIcon = '';
  $rootScope.currentPage = $location.path().split('/')[1];

}