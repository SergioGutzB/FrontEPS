angular
  .module('EpsService', [])
  .factory('eps', ['$http', function($http) {
    return {
      getUser: function(id) {
        global = $http({
          method: 'GET',
          url: 'http://35.163.238.128:3000/api/v1/users/' + id,
          data: id
        });
        return global;
      },
      getUsers: function() {
        global = $http({
          method: 'GET',
          url: 'http://35.163.238.128:3000/api/v1/users/'
        });
        return global;
      },
      addPatient: function(data) {
        global = $http({
          method: 'POST',
          url: 'http://35.163.238.128:3000/api/v1/auth/',
          data: data
        });
        return global;
      },
      addAttendants: function(data) {
        global = $http({
          method: 'POST',
          url: 'http://35.163.238.128:3000/api/v1/attendants',
          data: data
        });
        return global;
      },
      addEspecialidad: function(data) {
        global = $http({
          method: 'POST',
          url: 'http://35.163.238.128:3000/api/v1/services',
          data: data
        });
        return global;
      },
      getProfesionales: function() {
        global = $http({
          method: 'GET',
          url: 'http://35.163.238.128:3000/api/v1/doctors',
        });
        return global;
      },
      getProfesional: function(id) {
        global = $http({
          method: 'GET',
          url: 'http://35.163.238.128:3000/api/v1/doctors/:' + id,
        });
        return global;
      },
      addProfesional: function(data) {
        global = $http({
          method: 'POST',
          url: 'http://35.163.238.128:3000/api/v1/auth/',
          data: data
        });
        return global;
      },
      addHc: function(data) {
        global = $http({
          method: 'POST',
          url: 'http://35.163.238.128:3000/api/v1/histories',
          data: data
        });
        return global;
      },
      addCite: function(data) {
        global = $http({
          method: 'POST',
          url: 'http://35.163.238.128:3000/api/v1/cites',
          data: data
        });
        return global;
      },
      getCites: function() {
        global = $http({
          method: 'GET',
          url: 'http://35.163.238.128:3000/api/v1/cites'
        });
        return global;
      },
    };
  }]);