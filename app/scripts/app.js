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
        })
        .state("inactive", {
            url: '/inactive',
            controller: "TaskCtrl",
            templateUrl: "/templates/inactive-tasks.html"
        });
});



app.factory("Task", ["$firebaseArray", function ($firebaseArray) {
  var ref = new Firebase("https://blistering-heat-6122.firebaseIO.com/tasks");
  var tasks = $firebaseArray(ref);

  return {
    tasks: tasks,
    addTask: function (text, priority) {
      tasks.$add({text: text, priority: priority, isComplete: false, createdAt: Date.now()});
    },
    completeTask: function (task) {
      task.isComplete = true;
      tasks.$save(task);
    },
    deleteTask: function (task) {
      tasks.$remove(task);
    },
    isActive: function (task) {
      return (Date.now() - task.createdAt < 604800000) && (!task.isComplete);
    }
  };
}]);

app.controller("TaskCtrl", function($scope, Task) {
    // create a synchronized array to hold tasks
    $scope.tasks = Task.tasks;
    $scope.prioritySelect = "low";

    // add tasks to array
    $scope.addTask = function () {
      Task.addTask($scope.newTaskText, $scope.prioritySelect);
      $scope.newTaskText = '';
      $scope.prioritySelect = 'low';
    };

    $scope.completeTask = Task.completeTask;

    $scope.deleteTask = Task.deleteTask;

    $scope.isActive = Task.isActive;
});

app.directive('tasklist', ['Task', function(Task) {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: '/templates/tasklist.html',
    link: function link(scope, element, attrs) {
      console.log(attrs);
      scope.tasks = Task.tasks;
      // add tasks to array
      scope.addTask = function () {
        Task.addTask(scope.newTaskText);
        scope.newTaskText = '';
      };
      

      scope.completeTask = Task.completeTask;

      scope.deleteTask = Task.deleteTask;

      scope.shouldShow = function (task) {
        return attrs.isactive === 'true' ? Task.isActive(task) : !Task.isActive(task);
      };
    }
  };
}]);