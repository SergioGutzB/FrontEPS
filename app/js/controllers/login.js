var eps = angular.module('Eps');
eps.controller('Login', loginController);
loginController.$inject = ['$rootScope', '$location', '$auth', 'CONFIG', 'ROLES', 'eps'];

function loginController($rootScope, $location, $auth, CONFIG, ROLES, eps) {
  var self = this;

  $auth.validateUser()
    .then(function() {
      $location.path('/');
    })
    .catch(function(resp) {
      // console.log("no validate user..");
    });

  self.submitLogin = function() {
    $auth.submitLogin(self.loginForm)
      .then(function(response) {
        // console.log("logeado");
        var id = response.id;
        $rootScope.validate();
      })
      .catch(function(resp) {
        // console.log("No logeado");
      });
  };
  $rootScope.pageTitle = 'Login';
  $rootScope.pageIcon = '';
  $rootScope.currentPage = $location.path().split('/')[1];

}