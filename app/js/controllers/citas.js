var eps = angular.module('Eps');
eps.controller('Citas', CitasController);
CitasController.$inject = ['$mdToast', '$auth', 'moment', '$rootScope', 'alert', 'calendarConfig', '$scope', '$window', '$ocLazyLoad', 'sData', 'eps', '$filter'];

function CitasController($mdToast, $auth, moment, $rootScope, alert, calendarConfig, $scope, $window, $ocLazyLoad, sData, eps, $filter) {
  var self = this;

  self.sData = sData;
  self.cita = {};
  $rootScope.currentPage = 'citas_medicas';
  $rootScope.pageTitle = 'Citas Médicas';
  $rootScope.pageIcon = 'fa-calendar';

  self.date_cite = new Date();
  self.end_cite = null;

  self.especialidades = {};
  eps.getServices()
    .then(function(response) {
      self.especialidades = response.data.services;
      // console.log(self.especialidades);
    });

  self.liberar = function() {
    self.patient = null;
    self.sData.patient = null;
    load_cites();
  };

  function load_cites_doctors() {
    eps.getCites()
      .then(function(response) {
          // console.log("citas doctor...", $rootScope.user.doctor_id);
          // console.log(response.data.cites);
          self.cites = response.data.cites;
          self.cites = self.cites.filter(function(cite) {
            return cite.doctor.id === $rootScope.user.doctor_id;
          });
        },
        function(error) {
          console.log(error);
          self.cites = {};
          return;
        })
      .then(function(response) {
        self.cites = self.cites.map(function(cite) {
          var title, color, valuation;
          if (cite.valuation) {
            title = "Valoración - Paciente: " + cite.patient.name + " " + cite.patient.last_name;
            color = {
              primary: "#3F51B5",
              secondary: "#C5CAE9"
            };
          } else {
            title = "Evolución - Paciente: " + cite.patient.name + " " + cite.patient.last_name;
            color = {
              primary: "#00BCD4",
              secondary: "#B2EBF2"
            };
          }
          return $.extend(cite, {
            title: title,
            color: color,
            startsAt: moment(cite.date_cite)._d,
            endsAt: moment(cite.end_cite)._d,
          });
        });
        // console.log(self.cites);
      });
  }
  var load_cites = function() {
    eps.getCites()
      .then(function(response) {
        // console.log("citas 2...");
        // console.log(response.data.cites);
        if (self.patient) {
          // console.log(self.patient.id);
          self.cites = response.data.cites.filter(function(cite) {
            return cite.patient.id === self.patient.id;
          });
        } else
          self.cites = response.data.cites;
      }, function(error) {
        console.log(error);
        self.cites = {};
        return;
      })
      .then(function(response) {
        self.cites = self.cites.map(function(cite) {
          var title, color, valuation;
          if (cite.valuation) {
            title = "Valoración - ";
            color = {
              primary: "#3F51B5",
              secondary: "#C5CAE9"
            };
          } else {
            title = "Evolución";
            color = {
              primary: "#00BCD4",
              secondary: "#B2EBF2"
            };
          }
          var patient = cite.patient.name + " " + cite.patient.last_name;
          var speciality = cite.doctor.speciality;

          return $.extend(cite, {
            title: title,
            color: color,
            startsAt: moment(cite.date_cite)._d,
            endsAt: moment(cite.end_cite)._d,
          });
        });
        // console.log(self.cites);
      });
  };
  $rootScope.$watch('user', function() {
    if (self.sData.patient !== null) {
      // console.log("hay paciente");
      self.patient = self.sData.patient;
      load_cites();
    } else if ($rootScope.sesion === "Doctor") {
      // console.log("hay doctor");
      load_cites_doctors();
    } else {
      // console.log("no hay NADA");
      load_cites();
    }
  });

  $scope.$watch(function() {
    return self.cita.speciality;
  }, function() {
    eps.getProfesionales()
      .then(function(response) {
        self.profesionals = response.data.doctors.filter(function(doctor) {
          return doctor.speciality === self.cita.speciality;
        });
      });
  });

  function showSimpleToast(text) {
    $mdToast.show(
      $mdToast.simple()
      .textContent(text)
      .position("top right")
      .hideDelay(6000)
    );
  }
  //These variables MUST be set as a minimum for the calendar to work
  self.calendarView = 'week';
  self.viewDate = new Date();
  self.rangeSelected = function(startDate, endDate) {
    self.firstDateClicked = startDate;
    self.lastDateClicked = endDate;
  };

  calendarConfig.dateFormatter = 'moment'; // use moment instead of angular for formatting dates
  var originali18n = angular.copy(calendarConfig.i18nStrings);
  calendarConfig.i18nStrings.weekNumber = 'Semana {week}';

  $window.moment = $window.moment || moment;
  $ocLazyLoad.load('../../../bower_components/moment/locale/es.js').then(function() {
    moment.locale('es', {
      week: {
        dow: 1 // Monday is the first day of the week
      }
    });
    moment.locale('es'); // change the locale to french
  });

  $scope.$on('$destroy', function() {
    moment.locale('en');
    calendarConfig.i18nStrings = originali18n;
  });

  var actions = [{
    label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
    onClick: function(args) {
      alert.show('Edited', args.calendarEvent);
    }
  }, {
    label: '<i class=\'glyphicon glyphicon-remove\'></i>',
    onClick: function(args) {
      alert.show('Deleted', args.calendarEvent);
    }
  }];

  self.cellIsOpen = true;

  self.add = function() {
    // console.log("Añdiendo cita...");
    self.cita = $.extend(self.cita, {
      date_cite: moment(self.date_cite)._d,
      end_cite: moment(self.end_cite)._d,
      patient_id: self.patient.id,
      authorized: false,
      available: true
    });
    // console.log(self.cita);
    eps.addCite(self.cita)
      .then(function(response) {
        load_cites();
        showSimpleToast("Cita médica guardada con éxito");
        self.cita = {};
      }, function(error) {});

  };


  $scope.$watch(function() {
    return self.date_cite;
  }, function() {
    var date = moment($filter('date')(self.date_cite, "yyyy-MM-dd HH:mm"));
    if (self.cita.valuation)
      date = moment(date).add(20, "m");
    else
      date = moment(date).add(30, "m");
    self.end_cite = date._d;
  });

  self.eventClicked = function(event) {
    alert.show('Clicked', event);
  };

  self.eventEdited = function(event) {
    alert.show('Edited', event);
  };

  self.eventDeleted = function(event) {
    console.log("Deleted");
    alert.show('Deleted ju', event);
  };

  self.eventTimesChanged = function(event) {
    alert.show('Dropped or resized', event);
  };

  self.toggle = function($event, field, event) {
    $event.preventDefault();
    $event.stopPropagation();
    event[field] = !event[field];
  };

  self.timespanClicked = function(date, cell) {
    if (self.calendarView === 'month') {
      if ((self.cellIsOpen && moment(date).startOf('day').isSame(moment(self.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
        self.cellIsOpen = false;
      } else {
        self.cellIsOpen = true;
        self.viewDate = date;
      }
    } else if (self.calendarView === 'year') {
      if ((self.cellIsOpen && moment(date).startOf('month').isSame(moment(self.viewDate).startOf('month'))) || cell.events.length === 0) {
        self.cellIsOpen = false;
      } else {
        self.cellIsOpen = true;
        self.viewDate = date;
      }
    }

  };

}