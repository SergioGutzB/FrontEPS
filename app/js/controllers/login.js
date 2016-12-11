var eps = angular.module('Eps');
eps.controller('Login', loginController);
loginController.$inject = ['$rootScope', '$location', '$auth'];

function loginController($rootScope, $location, $auth) {
  var self = this;

  self.admin = {
    email: 'admin@gmail.com',
    password: "12345678",
    password_confirmation: "12345678",
    document: "321321",
    type: "admin"
  }

  $auth.validateUser()
    .then(function() {
      console.log("redirecionando..")
      $location.path('/');
    })
    .catch(function(resp) {

    });

  self.submitLogin = function() {
    $auth.submitLogin(self.loginForm)
      .then(function(resp) {
        console.log("logeado");
        console.log(resp);
        var user = resp;
        $rootScope.user = user;
        $rootScope.sesion = user.type;
        if (user.type = "admin")
          $location.path('/');
        if (user.type = "doctor")
          $location.path('/citas_medicas');
        if (user.type = "functionary")
          $location.path('/citas_medicas');
      })
      .catch(function(resp) {
        console.log("No logeado")
      });
  };

  $rootScope.pageTitle = 'Login';
  $rootScope.pageIcon = '';
  $rootScope.currentPage = $location.path().split('/')[1];

}