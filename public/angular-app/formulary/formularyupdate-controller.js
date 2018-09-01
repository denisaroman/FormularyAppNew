angular.module('formularyapp').controller('FormularyUpdateController', FormularyUpdateController);

function FormularyUpdateController($location, $route, $http, $routeParams, $scope, formularyDataFactory, AuthFactory) {
    var vm = this;
    var chapterId = $routeParams.chapterId;
    var listId = $routeParams.listId;
    var subcategoryId=$routeParams.subcategoryId;
    var medicineGroupId=$routeParams.medicineGroupId;
    var substanceId = $routeParams.substanceId;
    var detailsId = $routeParams.detailsId;
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

      vm.updateSubcategory = function() {
        var updateData = {
          Title: vm.Title
        };
        formularyDataFactory.subcategoryUpdate(chapterId, listId, subcategoryId, updateData).then(function(response) {
            if (response.status === 200) {
              $route.reload();
              $location.path('/chapter/'+chapterId+'/formulary/'+listId+'/'+index);
            }
          }).catch(function(error) {
            console.log(error);
          });
          $location.path('/chapter/'+chapterId+'/formulary/'+listId+'/'+index);
      }; 
  
    vm.deleteSubcategory=function(){
      formularyDataFactory.subcategoryDelete(chapterId, listId, subcategoryId).then(function(response) {
        //$window.location.href = '#';
        if (response.status === 200) {
          $route.reload();
          //$location.path('/');
        }
      }).catch(function(error) {
        console.log(error);
      });
      $location.path('/chapter/'+chapterId+'/formulary/'+listId+'/'+index);
    }

    vm.updateMedicineGroup = function() {
      var updateData = {
        Name: vm.Name
      };
      formularyDataFactory.medicineGroupUpdate(chapterId, listId, subcategoryId, medicineGroupId, updateData).then(function(response) {
          if (response.status === 200) {
            $route.reload();
            $location.path('/chapter/'+chapterId+'/formulary/'+listId+'/'+index);
          }
        }).catch(function(error) {
          console.log(error);
        });
        $location.path('/chapter/'+chapterId+'/formulary/'+listId+'/'+index);
    }; 

  vm.deleteMedicineGroup=function(){
    formularyDataFactory.medicineGroupDelete(chapterId, listId, subcategoryId, medicineGroupId).then(function(response) {
      //$window.location.href = '#';
      if (response.status === 200) {
        $route.reload();
        //$location.path('/');
      }
    }).catch(function(error) {
      console.log(error);
    });
    $location.path('/chapter/'+chapterId+'/formulary/'+listId+'/'+index);
  }
  vm.updateSubstance = function() {
    var updateData = {
      Substance: vm.Substance
    };
    formularyDataFactory.substanceUpdate(chapterId, listId, subcategoryId, medicineGroupId, substanceId, updateData).then(function(response) {
        if (response.status === 200) {
          $route.reload();
          $location.path('/chapter/'+chapterId+'/formulary/'+listId+'/'+index);
        }
      }).catch(function(error) {
        console.log(error);
      });
      $location.path('/chapter/'+chapterId+'/formulary/'+listId+'/'+index);
  }; 

vm.deleteSubstance=function(){
  formularyDataFactory.substanceDelete(chapterId, listId, subcategoryId, medicineGroupId, substanceId).then(function(response) {
    //$window.location.href = '#';
    if (response.status === 200) {
      $route.reload();
      //$location.path('/');
    }
  }).catch(function(error) {
    console.log(error);
  });
  $location.path('/chapter/'+chapterId+'/formulary/'+listId+'/'+index);
}

vm.updateDetails = function() {
  var updateData = {
    Brand: vm.Brand,
    Note: vm.Note,
    Link: vm.Link,
    Color: vm.Color
  };
  formularyDataFactory.detailsUpdate(chapterId, listId, subcategoryId, medicineGroupId, substanceId, detailsId, updateData).then(function(response) {
      if (response.status === 200) {
        $route.reload();
        $location.path('/chapter/'+chapterId+'/formulary/'+listId+'/'+index);
      }
    }).catch(function(error) {
      console.log(error);
    });
    $location.path('/chapter/'+chapterId+'/formulary/'+listId+'/'+index);
}; 

vm.deleteDetails=function(){
formularyDataFactory.detailsDelete(chapterId, listId, subcategoryId, medicineGroupId, substanceId, detailsId).then(function(response) {
  //$window.location.href = '#';
  if (response.status === 200) {
    $route.reload();
    //$location.path('/');
  }
}).catch(function(error) {
  console.log(error);
});
$location.path('/chapter/'+chapterId+'/formulary/'+listId+'/'+index);
}
}