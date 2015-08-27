var app = angular.module("BlocitoffApp", ["firebase"]);

app.factory("tasks", ["$firebaseArray", function($firebaseArray) {
      // create reference to database where data is stored
      var ref = new Firebase("https://blistering-heat-6122.firebaseIO.com");
      
      return $firebase(ref);
  }
]);
            


app.controller("TaskCtrl", function($scope, $firebaseArray){
    var ref = new Firebase("https://blistering-heat-6122.firebaseIO.com");
    
    // create a synchronized array to hold tasks
    $scope.tasks = $firebaseArray(ref);
        
    // add tasks to array
    $scope.addTask = function(task) {
       $scope.tasks.$add({text: $scope.newTaskText});
    };

});
    