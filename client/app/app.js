angular.module('doYourApps', [
  'doYourApps.main',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/main.html',
      controller: 'MainController'
    })
    .otherwise({
      redirectTo: '/#/'
    });
})