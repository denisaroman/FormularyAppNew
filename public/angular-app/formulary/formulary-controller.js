angular.module('formularyapp').controller('FormularyController', FormularyController);

function FormularyController($route, $http, $routeParams, $scope, formularyDataFactory, AuthFactory) {
    var vm = this;
    var chapterId = $routeParams.chapterId;
    vm.chapter=chapterId;
    var listId = $routeParams.listId;
    vm.list=listId;
    $scope.Category = [];
    $http.get('/api/chapter/' + chapterId ).then(function(response){
        $scope.index = $routeParams.index;
        vm.index=$routeParams.index;
        $scope.Category = response.data.List[$scope.index];
        $scope.Subcategories = $scope.Category.Subcategories;
        console.log(response.data.List[$scope.index]);
    });

    /*formularyDataFactory.listDisplay(chapterId, listId).then(function(response){
      console.log(response);
      vm.chapter = response.data;
      vm.list = response.data.List;
     
  });*/
 
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

      vm.addMedicine = function() {

      var subcategoryId=$routeParams.subcategoryId;
        var postData = {
          Name: vm.Name
        };
        formularyDataFactory.postMedicines(chapterId, listId, subcategoryId, postData).then(function(response) {
            if (response.status === 200) {
              $route.reload();
            }
          }).catch(function(error) {
            console.log(error);
          });
        
      }; 
}