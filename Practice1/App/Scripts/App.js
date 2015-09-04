var app = app || angular.module("PracApp", ['ngRoute']);

app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: 'App/Scripts/Views/Home.html'
    }).when('/Register', {
        templateUrl: 'App/Scripts/Views/Register.html'
    }).when('/Comfirm', {
        templateUrl: 'App/Scripts/Views/Confirm.html'
    }).otherwise({ redirectTo: '/' });

    $httpProvider.interceptors.push('AuthFactory');
}]);