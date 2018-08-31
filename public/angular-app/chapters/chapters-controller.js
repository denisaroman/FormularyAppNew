angular.module('formularyapp').controller('ChaptersController', ChaptersController);

function ChaptersController($route, $routeParams, formularyDataFactory, AuthFactory) {
    var vm = this;
    var id = $routeParams.id;
    //vm.isSubmitted = false;

    formularyDataFactory.chaptersDisplay(id).then(function(response){
        console.log(response);
       // $scope.allCategories = response.data;
        //$scope.categId = $routeParams.itemId;
        //$scope.category = response.data[$scope.categId];
        vm.chapter = response.data;
        vm.list = response.data.List;
    });

    vm.isLoggedIn = function() {
      if (AuthFactory.isLoggedIn) {
        return true;
      } else {
        return false;
      }
    };

    vm.addList = function() {

    
        var postData = {
          CategoryNumber: vm.CategoryNumber,
          CategoryName: vm.CategoryName
        };
        formularyDataFactory.postLists(id, postData).then(function(response) {
            if (response.status === 200) {
              $route.reload();
            }
          }).catch(function(error) {
            console.log(error);
          });
        
      };    
}