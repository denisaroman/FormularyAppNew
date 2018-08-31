angular.module('formularyapp').controller('CategoryUpdateController', CategoryUpdateController);

function CategoryUpdateController($location, $route, $routeParams, formularyDataFactory, AuthFactory) {
    var vm = this;
    var chapterId = $routeParams.chapterId;
    var listId = $routeParams.listId;

    vm.updateCategory = function() {
      var updateData = {
        CategoryNumber: vm.CategoryNumber,
        CategoryName: vm.CategoryName
      };
      formularyDataFactory.categoryUpdate(chapterId, listId, updateData).then(function(response) {
          if (response.status === 200) {
            $route.reload();
          }
        }).catch(function(error) {
          console.log(error);
        });
       $location.path('/chapter/'+chapterId);
    }; 

  vm.deleteCategory=function(){
    formularyDataFactory.categoryDelete(chapterId, listId).then(function(response) {
      //$window.location.href = '#';
      if (response.status === 200) {
        $route.reload();
        $location.path('/');
      }
    }).catch(function(error) {
      console.log(error);
    });
    $location.path('/chapter/'+chapterId);
  }
    

    vm.isLoggedIn = function() {
      if (AuthFactory.isLoggedIn) {
        return true;
      } else {
        return false;
      }
    };

     
}