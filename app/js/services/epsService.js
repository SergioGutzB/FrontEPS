angular
  .module('EpsService', [])
  .factory('eps', ['$http', function($http) {
    return {
      getUser: function() {
        global = $http({
          method: 'GET',
          url: 'http://35.163.238.128:3000/api/v1/users/'
        })
        return global;
      },
      addEspecialidad: function(data) {
        global = $http({
          method: 'POST',
          url: 'http://35.163.238.128:3000/api/v1/services',
          data: data
        })
        return global;
      },
      getProfesionales: function() {
        global = $http({
          method: 'GET',
          url: 'http://35.163.238.128:3000/api/v1/doctors',
        })
        return global;
      },


    };
  }])