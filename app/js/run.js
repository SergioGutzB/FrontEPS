angular
  .module('Eps')
  .config(appConfig)
  .run(function($rootScope, $auth, $location, moment, eps, CONFIG, ROLES) {
    $rootScope.currentPage = 'inicio';
    $rootScope.pageTitle = 'Inicio';
    $rootScope.pageIcon = 'fa-home';
    $rootScope.user = {};
    $rootScope.rol = 0;
    $rootScope.date = moment().format('LL');

    $rootScope.signOut = function() {
      $auth.signOut()
        .then(function(resp) {
          console.log("signOut");
          CONFIG.ROL_CURRENT_USER = 0;
          $location.path('/login');
        })
        .catch(function(resp) {
          console.log("No signOut")
        });
    };

    $auth.validateUser()
      .then(function(response) {
        console.log("hay usuario..");
        console.log(response);
        var id = response.id;
        eps.getUser(id)
          .then(function(response) {
            var user = response.data;
            $rootScope.user = user;
            $rootScope.sesion = user.type;
            if (user.type == null) {
              CONFIG.ROL_CURRENT_USER = 3;
            }
            if (user.type == "Functionary") {
              CONFIG.ROL_CURRENT_USER = 4;
            }
            if (user.type == "Patient") {
              CONFIG.ROL_CURRENT_USER = 2;
            }
            if (user.type == "Admin") {
              CONFIG.ROL_CURRENT_USER = 1;
            }
          })
          .catch(function(error) {

          })
      })
      .catch(function(response) {
        CONFIG.ROL_CURRENT_USER = 0;
        $rootScope.sesion = null;
        $location.path('/login');
      })

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