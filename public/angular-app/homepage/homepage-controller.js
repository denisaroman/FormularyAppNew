angular.module('formularyapp').controller('HomepageController', HomepageController);

function HomepageController($location, $window, $routeParams, formularyDataFactory, AuthFactory) {
    var vm = this;
    var id = $routeParams.id;
    //vm.titile = 'App';
    formularyDataFactory.chaptersList().then(function(response){
        console.log(response);
        vm.chapters = response.data;
    });

    formularyDataFactory.chaptersDisplay(id).then(function(response){
      console.log(response);
     // $scope.allCategories = response.data;
      //$scope.categId = $routeParams.itemId;
      //$scope.category = response.data[$scope.categId];
      vm.chapter = response.data;
     // vm.list = response.data.List;
  });

    vm.updateChapter = function() {
        var updateData = {
            Number: vm.Number,
            Chapter: vm.Chapter,
        };
        formularyDataFactory.chaptersUpdate(id, updateData).then(function(response) {
            if (response.status === 200) {
              $route.reload();
            }
          }).catch(function(error) {
            console.log(error);
          });
          $location.path('/');
      }; 

    vm.deleteChapter=function(){
      formularyDataFactory.chaptersDelete(id).then(function(response) {
        //$window.location.href = '#';
        if (response.status === 200) {
          $route.reload();
          $location.path('/');
        }
      }).catch(function(error) {
        console.log(error);
      });
      $location.path('/');
    }

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