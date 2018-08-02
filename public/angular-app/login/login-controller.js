angular.module('formularyapp').controller('LoginController', LoginController);

function LoginController($http, $location, $window, AuthFactory, jwtHelper, $rootScope) {
  var vm = this;

  $rootScope.$on('login', function (event, data) {
          console.log('broadcast from child in parent');
          vm.username = data.username;
          vm.password = data.password;
          vm.login();
      });

  vm.isLoggedIn = function() {
    if (AuthFactory.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  };

  vm.login = function() {
    if (vm.username && vm.password) {
      var user = {
        username: vm.username,
        password: vm.password
      };

      $http.post('/api/users/login', user).then(function(response) {
        if (response.data.success) {
          $window.sessionStorage.token = response.data.token;
          //console.log(response.data.token);
          AuthFactory.isLoggedIn = true;
          var token = $window.sessionStorage.token;
          var decodedToken = jwtHelper.decodeToken(token);
          vm.loggedInUser = decodedToken.username;
          $window.location.href = '#';
        }
      }).catch(function(error) {
        console.log(error);
      })

    }
  }

  vm.logout = function() {
    AuthFactory.isLoggedIn = false;
    delete $window.sessionStorage.token;
    $location.path('/');
  }

  /*vm.isActiveTab = function(url) {
    var currentPath = $location.path().split('/')[1];
    return (url === currentPath ? 'active' : '');
  }*/

}