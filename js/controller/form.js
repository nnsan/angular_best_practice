mainModule.controller("form", [
  "$scope",
  function ($scope) {
    $scope.data = {};

    //Config for Form inputs
    this.showScopeObject = function () {
      var data = {
        name: $scope.name,
        email: $scope.email,
        isStudent: $scope.isStudent,
        studentCode: $scope.studentCode
      };

      console.log(data);
    }
  }
]);
