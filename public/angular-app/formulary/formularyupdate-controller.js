angular.module('formularyapp').controller('FormularyUpdateController', FormularyUpdateController);

function FormularyUpdateController($location, $route, $http, $routeParams, $scope, formularyDataFactory, AuthFactory) {
    var vm = this;
    var chapterId = $routeParams.chapterId;
    var listId = $routeParams.listId;
    var subcategoryId=$routeParams.subcategoryId;
    var medicineGroupId=$routeParams.medicineGroupId;
    var substanceId = $routeParams.substanceId;
    var index=$routeParams.index;
    
 
    vm.isLoggedIn = function() {
        if (AuthFactory.isLoggedIn) {
          return true;
        } else {
          return false;
        }
      };
    

      vm.addMedicine = function() {

        var postData = {
          Name: vm.Name
        };
        formularyDataFactory.postMedicines(chapterId, listId, subcategoryId, postData).then(function(response) {
            if (response.status === 200) {
              //$route.reload();
              $location.path('/chapter/'+chapterId+'/formulary/'+listId+'/'+index);
            }
          }).catch(function(error) {
            console.log(error);
          });
        
      }; 
      vm.addSubstance = function() {

        var postData = {
          Substance: vm.Substance
        };
        formularyDataFactory.postSubstances(chapterId, listId, subcategoryId, medicineGroupId, postData).then(function(response) {
            if (response.status === 200) {
              //$route.reload();
              $location.path('/chapter/'+chapterId+'/formulary/'+listId+'/'+index);
            }
          }).catch(function(error) {
            console.log(error);
          });
        
      }; 
      vm.addBrand = function() {

        var postData = {
          Brand: vm.Brand,
          Note: vm.Note,
          Link: vm.Link,
          Color: vm.Color
        };
        formularyDataFactory.postBrand(chapterId, listId, subcategoryId, medicineGroupId, substanceId, postData).then(function(response) {
            if (response.status === 200) {
              //$route.reload();
              $location.path('/chapter/'+chapterId+'/formulary/'+listId+'/'+index);
            }
          }).catch(function(error) {
            console.log(error);
          });
        
      }; 
}