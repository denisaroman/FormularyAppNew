angular.module('formularyapp').controller('HomepageController', HomepageController);

function HomepageController($http) {
    var vm = this;
    vm.titile = 'App';
    $http.get('/api/homepage').then(function(response){
        console.log(response);
        vm.chapters = response.data;
    });


}