angular.module('formularyapp').controller('FormularyController', FormularyController);

function FormularyController($route, $http, $routeParams, $scope, formularyDataFactory, AuthFactory) {
    var vm = this;
    var chapterId = $routeParams.chapterId;
    var listId = $routeParams.listId;
    $scope.Category = [];
    $http.get('/api/chapter/' + chapterId ).then(function(response){
        $scope.index = $routeParams.index;
        $scope.Category = response.data.List[$scope.index];
        $scope.Subcategories = $scope.Category.Subcategories;
        console.log(response.data.List[$scope.index]);
    });
 
    vm.isLoggedIn = function() {
        if (AuthFactory.isLoggedIn) {
          return true;
        } else {
          return false;
        }
      };
    vm.addSubcategory = function() {
        var postData = {
          Title: vm.Title
        };
        formularyDataFactory.postSubcategories(chapterId, listId, postData).then(function(response) {
            if (response.status === 200) {
              $route.reload();
            }
          }).catch(function(error) {
            console.log(error);
          });
        
      }; 
}