mainModule.controller("form.controller", [
  "$scope",
  function ($scope) {
    $scope.data = {
      name: "San Nguyen",
      description: "Beautiful girl!",
      jobs: [
        {
          name: "software developer",
          duration: "2011 - 2015"
        },
        {
          name: "senior software developer",
          duration: "2015 - now"
        }
      ]
    };
  }
]);
