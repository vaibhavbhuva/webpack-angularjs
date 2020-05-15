(function() {
  angular.module('myApp')
  .controller('myCtrl',myCtrl);
  
  myCtrl.$inject  = ['$scope','dataService'];

  function myCtrl($scope,dataService) {
    $scope.firstName= "John";
    $scope.lastName= "Doe";
    $scope.names = ['Jani', 'Carl', 'Margareth', 'Hege', 'Joe', 'Gustav', 'Birgit', 'Mary', 'Kai'];
    
    function getList(){
      dataService.fetchAllUsers().then(
          function(result) {
               $scope.users = result.data;
          },
           function(errResponse){
               console.error('Error while fetching Currencies');
           }
          );
    }
  
    getList();
  }

})(); 
