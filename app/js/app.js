var eps = angular.module('Eps', [
  'ngRoute',
  'ngMaterial',
  'ngMessages',
  'ui.grid',
  'ui.grid.pagination',
  'ui.grid.selection',
]);

eps.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('eps-dark')
    .primaryPalette('light-green', {
      'default': '400', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    .dark()
    .warnPalette('red')
    .accentPalette('orange');

});