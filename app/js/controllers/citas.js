var eps = angular.module('Eps');
eps.controller('Citas', CitasController);
CitasController.$inject = ['$mdToast', '$auth', 'moment', '$rootScope', 'alert', 'calendarConfig', '$scope', '$window', '$ocLazyLoad', 'sData', 'eps'];

function CitasController($mdToast, $auth, moment, $rootScope, alert, calendarConfig, $scope, $window, $ocLazyLoad, sData, eps) {
  var self = this;

  self.sData = sData;
  self.cita = {};
  $rootScope.currentPage = 'citas_medicas';
  $rootScope.pageTitle = 'Citas Médicas';
  $rootScope.pageIcon = 'fa-calendar';

  var load_cites = function() {
    eps.getCites()
      .then(function(response) {
        console.log("citas...");
        console.log(response.data.cites);
        console.log(self.patient.id);
        self.cites = response.data.cites.filter(function(cite) {
          return cite.patient.id === self.patient.id;
        });
        self.cites = self.cites.map(function(cite) {
          if (cite.valuation) {
            var title = "Valoración";
            var color = calendarConfig.colorTypes.warning;
          }
          return $.extend(cite, {
            title: title,
            color: color,
            startsAt: moment(cite.date_cite).format(),
            endsAt: moment(cite.end_cite).format(),
          });
        });
        console.log(self.cites);
      }, function(error) {
        console.log(error);
        self.cites = {};
      });
  }

  if (self.sData.patient !== null) {
    self.patient = self.sData.patient;
    load_cites();
  }





  $scope.$watch(function() {
    return self.cita.speciality;
  }, function() {
    eps.getProfesionales()
      .then(function(response) {
        self.profesionals = response.data.doctors.filter(function(doctor) {
          return doctor.speciality === self.cita.speciality;
        });
      })
  });

  self.openToast = function($event) {
    $mdToast.show($mdToast.simple().textContent('Hello!'));
    // Could also do $mdToast.showSimple('Hello');
  };
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
  // self.events = [{
  //   title: 'Paciente 1',
  //   color: calendarConfig.colorTypes.warning,
  //   startsAt: moment().startOf('day').add(7, 'hours').toDate(),
  //   endsAt: moment().startOf('day').add(7.5, 'hours').toDate(),
  //   draggable: true,
  //   resizable: true,
  //   actions: actions
  // }, {
  //   title: 'Paciente 2',
  //   color: calendarConfig.colorTypes.info,
  //   startsAt: moment().startOf('day').add(7.5, 'hours').toDate(),
  //   endsAt: moment().startOf('day').add(8, 'hours').toDate(),
  //   draggable: true,
  //   resizable: true,
  //   actions: actions
  // }, {
  //   title: 'Paciente 3',
  //   color: calendarConfig.colorTypes.important,
  //   startsAt: moment().startOf('day').add(8, 'hours').toDate(),
  //   endsAt: moment().startOf('day').add(9, 'hours').toDate(),
  //   recursOn: 'year',
  //   draggable: true,
  //   resizable: true,
  //   actions: actions
  // }];

  self.cellIsOpen = true;

  self.add = function() {
    console.log("Añdiendo cita...");

    self.cita = $.extend(self.cita, { patient_id: self.patient.id, authorized: false, available: true });
    console.log(self.cita);
    eps.addCite(self.cita)
      .then(function(response) {
        load_cites();
        self.openToast("Cita médica guardada con éxito");
        self.cita = {};
      }, function(error) {})

  };

  // self.cita.date_cite = moment().hours(3).format()

  $scope.$watch(function() {
    return self.cita.date_cite;
  }, function() {
    self.cita.end_cite = self.cita.date_cite;
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