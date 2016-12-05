var eps = angular.module('Eps');
eps.controller('Citas', CitasController);
CitasController.$inject = ['moment', 'alert', 'calendarConfig', '$scope', '$window', '$ocLazyLoad'];

function CitasController(moment, alert, calendarConfig, $scope, $window, $ocLazyLoad) {
  var vm = this;

  $scope.$on('$destroy', function() {
    moment.locale('en');
    calendarConfig.i18nStrings = originali18n;
  });

  //These variables MUST be set as a minimum for the calendar to work
  vm.calendarView = 'week';
  vm.viewDate = new Date();
  vm.rangeSelected = function(startDate, endDate) {
    vm.firstDateClicked = startDate;
    vm.lastDateClicked = endDate;
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
  vm.events = [{
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

  vm.cellIsOpen = true;

  vm.addEvent = function() {
    vm.events.push({
      title: 'New event',
      startsAt: moment().startOf('day').toDate(),
      endsAt: moment().endOf('day').toDate(),
      color: calendarConfig.colorTypes.important,
      draggable: true,
      resizable: true
    });
  };

  vm.eventClicked = function(event) {
    alert.show('Clicked', event);
  };

  vm.eventEdited = function(event) {
    alert.show('Edited', event);
  };

  vm.eventDeleted = function(event) {
    console.log("Deleted");
    alert.show('Deleted ju', event);
  };

  vm.eventTimesChanged = function(event) {
    alert.show('Dropped or resized', event);
  };

  vm.toggle = function($event, field, event) {
    $event.preventDefault();
    $event.stopPropagation();
    event[field] = !event[field];
  };

  vm.timespanClicked = function(date, cell) {

    if (vm.calendarView === 'month') {
      if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
        vm.cellIsOpen = false;
      } else {
        vm.cellIsOpen = true;
        vm.viewDate = date;
      }
    } else if (vm.calendarView === 'year') {
      if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
        vm.cellIsOpen = false;
      } else {
        vm.cellIsOpen = true;
        vm.viewDate = date;
      }
    }

  };

}