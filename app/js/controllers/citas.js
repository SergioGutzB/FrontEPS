var eps = angular.module('Eps');
eps.controller('Citas', CitasController);
CitasController.$inject = ['$mdToast', '$auth', 'moment', '$rootScope', 'alert', 'calendarConfig', '$scope', '$window', '$ocLazyLoad', 'sData'];

function CitasController($mdToast, $auth, moment, $rootScope, alert, calendarConfig, $scope, $window, $ocLazyLoad, sData) {
  var self = this;

  self.sData = sData;
  self.cita = {};
  $rootScope.currentPage = 'citas_medicas';
  $rootScope.pageTitle = 'Citas Médicas';
  $rootScope.pageIcon = 'fa-calendar';


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
  self.events = [{
    title: 'Paciente 1',
    color: calendarConfig.colorTypes.warning,
    startsAt: moment().startOf('day').add(7, 'hours').toDate(),
    endsAt: moment().startOf('day').add(7.5, 'hours').toDate(),
    draggable: true,
    resizable: true,
    actions: actions
  }, {
    title: 'Paciente 2',
    color: calendarConfig.colorTypes.info,
    startsAt: moment().startOf('day').add(7.5, 'hours').toDate(),
    endsAt: moment().startOf('day').add(8, 'hours').toDate(),
    draggable: true,
    resizable: true,
    actions: actions
  }, {
    title: 'Paciente 3',
    color: calendarConfig.colorTypes.important,
    startsAt: moment().startOf('day').add(8, 'hours').toDate(),
    endsAt: moment().startOf('day').add(9, 'hours').toDate(),
    recursOn: 'year',
    draggable: true,
    resizable: true,
    actions: actions
  }];

  self.cellIsOpen = true;

  self.add = function() {
    console.log(self.cita);
    self.events.push({
      title: self.sData.paciente.primerNombre + " " + self.sData.paciente.primerApellido,
      startsAt: self.cita.startsAt,
      endsAt: self.cita.endsAt,
      color: calendarConfig.colorTypes.important,
      draggable: true,
    });
    self.openToast("Cita médica guardada con éxito");
    self.cita = {};
  }

  $scope.$watch(function() {
    return self.cita.startsAt;
  }, function() {
    self.cita.endsAt = self.cita.startsAt;
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