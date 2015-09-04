app.controller('ConfirmController', ['$scope', 'ComfirmFactory', function ($scope, ConfirmFactory) {
    $scope.getName = function (id) {
        
        ConfirmFactory.getName().then(function (data) {
            $scope.Name = data;
        });
    };
}]);