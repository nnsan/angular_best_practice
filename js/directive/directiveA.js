mainModule.directive("directiveA", [
  "$timeout",
  function ($timeout) {
    return {
      restrict: "E",
      scope: {
        isLoaded: "=?"
      },
      link: function (scope, el, attrs) {
        $timeout(function () {
          scope.isLoaded = true;
        });
      },
      template: "<div>This is directive a</div>"
    }
  }
]);
