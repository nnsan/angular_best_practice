mainModule.controller("home.controller", [
  "$scope",
  "$location",
  "serviceA",
  function ($scope, $location, serviceA) {
    var me = this;

    $scope.greeting = "Hello World! Welcome to the Angular Best practice";

    serviceA.doSomething();

    me.goFormPage = function () {
      $location.path("/form.ng-if");
    };
    me.goAngularCopy = function () {
      $location.path("/angular.copy");
    };
    me.goFormCustomValidation = function () {
      $location.path("/form.custom-validation");
    };
    me.goFormInputs = function () {
      $location.path("/form.inputs");
    };
    me.goNgViewWithAsynchronousView = function () {
      $location.path("asynchronous-view");
    }
  }
]);
