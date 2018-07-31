angular.module('formularyapp').controller('FormularyController', FormularyController);

function FormularyController($http, $routeParams, $scope) {
    //var vm = this;
    var id = $routeParams.id;
    $scope.Category = [];
    //var x = $routeParams.itemId;
    $http.get('/api/chapter/' + id ).then(function(response){
        //console.log(response);
        //vm.chapter = response.data;
       // vm.list = response.data.List;
        //$scope.allCategories = response.data;
        $scope.index = $routeParams.index;
        $scope.Category = response.data.List[$scope.index];
        $scope.Subcategories = $scope.Category.Subcategories;
        console.log(response.data.List[$scope.index]);
    });
}