var app = angular.module("blocitoffApp", ["ui.router", "firebase"]);

app.config(function($stateProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    
    $stateProvider
        .state("index", {
            url: '/',
            controller: "TaskCtrl",
            templateUrl: "/templates/active-tasks.html"
        });
});

//app.factory("tasks", ["$firebaseArray", function($firebaseArray) {
//      // create reference to database where data is stored
//      var ref = new Firebase("https://blistering-heat-6122.firebaseIO.com");
//      
//      return $firebase(ref);
//  }
//]);
            


app.controller("TaskCtrl", function($scope, $firebaseArray){
    var ref = new Firebase("https://blistering-heat-6122.firebaseIO.com/tasks");
    
    // create a synchronized array to hold tasks
    $scope.tasks = $firebaseArray(ref);
        
    // add tasks to array
    $scope.addTask = function(task) {
       $scope.tasks.$add({text: $scope.newTaskText, isComplete: false, createdAt: Date.now()});
    };
    
    $scope.completeTask = function (task) {
        task.isComplete = true;
        $scope.tasks.$save(task);
    }

    $scope.isOlderThanSevenDays = function (task) {
        return Date.now() - task.createdAt > 604800000;
    }
});  