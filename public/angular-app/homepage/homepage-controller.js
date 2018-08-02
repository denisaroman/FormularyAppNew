angular.module('formularyapp').controller('HomepageController', HomepageController);

function HomepageController($http, AuthFactory) {
    var vm = this;
    vm.titile = 'App';
    $http.get('/api/homepage').then(function(response){
        console.log(response);
        vm.chapters = response.data;
    });

    vm.isLoggedIn = function() {
        if (AuthFactory.isLoggedIn) {
          return true;
        } else {
          return false;
        }
      };

    vm.logout = function() {
        AuthFactory.isLoggedIn = false;
        delete $window.sessionStorage.token;
        $location.path('/');
    }
}