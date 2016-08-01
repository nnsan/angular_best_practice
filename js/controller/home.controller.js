mainModule.controller("home.controller", [
  "$scope",
  "$location",
  function ($scope, $location) {
    var me = this;

    $scope.greeting = "Hello World! I'm a beautiful girl";

    me.goFormPage = function () {
      $location.path("/form");
    };
  }
]);
