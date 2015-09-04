app.controller('NavbarController', ['$scope', 'UserFactory', function ($scope, UserFactory) {

    $scope.status = UserFactory.status;
}]);