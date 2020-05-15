(function(){


    angular.module("myApp")
    .service("dataService", dataService);
    dataService.$inject = ['$http', '$q'];
    
    function dataService($http, $q) {
        let service  = {
            fetchAllUsers : fetchAllUsers
        }
    
        return service;
    
        function fetchAllUsers(){
            return $http.get('http://dummy.restapiexample.com/api/v1/employees')
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        console.error('Error while fetching users');
                        return $q.reject(errResponse);
                    }
            );
        }
    }


})();