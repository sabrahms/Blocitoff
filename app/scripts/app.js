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
        .state("completed", {
            url: "/completed",
            controller: 
            templateUrl: "templates/completed-tasks.html"
            
        })
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
       $scope.tasks.$add({text: $scope.newTaskText});
    };
});  

app.controller("CreateTaskCtrl", ["$scope"])

app.controller("ActiveTaskCtrl", ["$scope", "Task",
        function($scope, Task) {
            $scope.tasks = Tasks.getTasks();
                                  
}])

app.directive("completedTasks", function (task) {
    return {
        templateUrl: "templates/completed-tasks.html",
        restrict: "E",
        replace: true,
        scope: { },
        link: function(scope, element, attributes) {
            scope.addTask = function(task) {
            scope.tasks.$add({isComplete: false, createdAt: Date.now()});
            scope.completeTask = function(task) {
                task.isComplete = true;
            scope.tasks.$save(task);
        }
    };
            scope.isOlderThanSevenDays = function (task) {
                return Date.now() - task.createdAt > 604800000;
            }    
        }
    };
});