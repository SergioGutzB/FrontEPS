angular
  .module('Eps')
  .config(appConfig)
  .run(function($rootScope, $auth, $location, moment, eps, CONFIG, ROLES) {
    $rootScope.currentPage = 'inicio';
    $rootScope.pageTitle = 'Inicio';
    $rootScope.pageIcon = 'fa-home';
    $rootScope.user = {};
    $rootScope.rol = 3;
    $rootScope.date = moment().format('LL');

    $rootScope.signOut = function() {
      $auth.signOut()
        .then(function(resp) {
          console.log("signOut");
          CONFIG.ROL_CURRENT_USER = 3;
          $location.path('/login');
        })
        .catch(function(resp) {
          console.log("No signOut")
        });
    };

    // $rootScope.$on('$routeChangeStart', function(event, next) {
    //   if (next.data !== undefined) {
    //     if (next.data.authorized.indexOf(CONFIG.ROL_CURRENT_USER) !== -1) {
    //       console.log("entra");
    //     } else {
    //       if (CONFIG.ROL_CURRENT_USER == 0) {
    //         $location.path(ROLES.ANONYMOUS.PATH);
    //       } else if (CONFIG.ROL_CURRENT_USER == 1) {
    //         $location.path(ROLES.ADMIN.PATH);
    //       } else if (CONFIG.ROL_CURRENT_USER == 2) {
    //         $location.path(ROLES.PATIENT.PATH);
    //       } else if (CONFIG.ROL_CURRENT_USER == 3) {
    //         $location.path(ROLES.PROFESIONAL.PATH);
    //       }

    //     }
    //   }
    // })
  })