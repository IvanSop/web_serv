var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/home.html',
      access: {restricted: true}
    })
    .when('/login', {
      templateUrl: '/login.html',
      controller: 'loginController',
      access: {restricted: false, reverseRestricted: true}
    })
    .when('/logout', {
      controller: 'logoutController',
      access: {restricted: true}
    })
    .when('/register', {
      templateUrl: 'register.html',
      controller: 'registerController',
      access: {restricted: false, reverseRestricted: true}
    })
    .when('/one', {
      template: '<h1>This is page one!</h1>',
      access: {restricted: true}
    })
    .when('/two', {
      template: '<h1>This is page two!</h1>',
      access: {restricted: false}
    })
    .when('/project', {
      templateUrl: '/project.html',
      access: {restricted: true}
    })
    .otherwise({
      redirectTo: '/'
    });
});

myApp.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus()
      .then(function(){
        if (next.access.restricted && !AuthService.isLoggedIn()){
          $location.path('/login');
          $route.reload();
        }
        if (next.access.reverseRestricted && AuthService.isLoggedIn()) {
          $location.path('/');
          $route.reload();
        }
      });
  });
});