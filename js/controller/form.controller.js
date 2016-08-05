mainModule.controller("form.controller", [
  "$scope",
  function ($scope) {
    var me = this;

    $scope.data = {};
    $scope.isContactForm = true;

    me.showReview = function () {
      console.log($scope.formContact);
    };
  }
]);
