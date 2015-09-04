app.controller('ConfirmFactory', ['$http','$q', function ($http, ConfirmFactory) {
    o.getName = function () {
        var config = { contextType: 'application/json' };
        var defer = $q.defer();
        $http.get('/api/apiName/', config).success(function (data) {
            defer.resolve(data);
        });
        return defer.promise;
    };
}]);