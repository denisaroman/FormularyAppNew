angular.module('formularyapp').controller('ChaptersController', ChaptersController);

function ChaptersController($http, $routeParams) {
    var vm = this;
    var id = $routeParams.id;

    $http.get('/api/chapter/' + id).then(function(response){
        console.log(response);
       // $scope.allCategories = response.data;
        //$scope.categId = $routeParams.itemId;
        //$scope.category = response.data[$scope.categId];
        vm.chapter = response.data;
        vm.list = response.data.List;
    });
}