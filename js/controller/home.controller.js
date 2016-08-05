mainModule.controller("home.controller", [
  "$scope",
  "$location",
  function ($scope, $location) {
    var me = this;

    $scope.greeting = "Hello World! Welcome to the Angular Best practice";

    me.goFormPage = function () {
      $location.path("/form");
    };
  }
]);
