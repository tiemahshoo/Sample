app.factory('UserFactory', ['$http', '$q', function ($http, $q, $httpProvider) {
    var o = {};

    o.register = function (user) {
        var defer = $q.defer();
        var config = { contentType: 'application/json' };
        $http.post('/api/Account/Register/', user, config).success(function (data) {
            defer.resolve(data)
        });
        return defer.promise;
    };
    //set token for login
    o.setToken = function (token) {
        localStorage.setItem('token', token);
    };
    //get token for login status check
    o.getToken = function () {
        return localStorage.getItem('token');
    };
    //remove token for log out
    o.removeToken = function () {
        localStorage.removeItem('token');
        alert('You have signed out!');
    };
    //authenticate
    o.login = function (user) {
        var q = $q.defer();
        $http.post('/Token', 'username=' + user.username + '&password=' + user.password + '&grant_type=password', { contentType: 'application/x-www-form-urlencoded' }).success(function (data) {
            o.setToken(data.access_token);
            q.resolve();
        }).error(function (data) {
            q.reject(data.error_description);
        });
        return q.promise;
    };
    //logout
    o.logout = function () {
        o.removeToken();
    };

    o.status = {};
    o.status.isLoggedIn = (o.getToken()) ? true : false;

    return o;
}]);