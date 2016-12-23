angular
  .module('ServeData', [])
  .service('sData', [function() {
    return {
      pageTitle: '',
      pageIcon: '',
      patient: null,
      profesional: null,      
    };
  }]);