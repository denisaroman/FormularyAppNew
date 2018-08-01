angular.module('formularyapp').controller('AddController', AddController);

function AddController($http) {
  var vm = this;

  vm.add = function() {
    var chapter = {
        Number: vm.Number,
        Chapter: vm.Chapter,
        CategoryNumber: vm.CategoryNumber,
        CategoryName: vm.CategoryName,
        Title: vm.Title,
        Name: vm.Name,
        Substance: vm.Substance,
        Brand : vm.Brand,
        Note : vm.Note,
        Link : vm.Link,
        Color: vm.Color 
    }
$http.post('/api/homepage', chapter).then(function(result) {
        console.log(result);
    }).catch(function(error) {
        console.log(error);
    })
    
}
};