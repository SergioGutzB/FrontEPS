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
          // console.log("signOut");
          CONFIG.ROL_CURRENT_USER = 0;
          $location.path('/login');
          $rootScope.user = null;
          $rootScope.sesion = null;
        })
        .catch(function(resp) {
          // console.log("No signOut")
        });
    };
    $rootScope.validate = function() {
      $auth.validateUser()
        .then(function(response) {
          // console.log("hay usuario..");
          // console.log(response);
          var user = response;
          var id = response.id;
          eps.getUser(id)
            .then(function(response) {
              user = $.extend(user, response.data);
              // console.log("user: ", user);
              if (user.doctor_id)
                eps.getProfesional(user.doctor_id)
                .then(function(response) {
                  user = $.extend(user, response.data);
                })
              $rootScope.user = user;
              $rootScope.sesion = user.type;
              if (user.type == null) {
                CONFIG.ROL_CURRENT_USER = 3;
                $rootScope.sesion = 'Doctor';
                $location.path('/citas_medicas');
              }
              if (user.type == "Functionary") {
                CONFIG.ROL_CURRENT_USER = 4;
                $location.path('/citas_medicas');
              }
              if (user.type == "Patient") {
                CONFIG.ROL_CURRENT_USER = 2;
                $location.path('/citas_medicas');
              }
              if (user.type == "Admin") {
                CONFIG.ROL_CURRENT_USER = 1;
                $location.path('/admin');
              }
            })
        })
        .catch(function(response) {
          CONFIG.ROL_CURRENT_USER = 0;
          $rootScope.sesion = null;
          $location.path('/login');
        })
    }
    $rootScope.validate();

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