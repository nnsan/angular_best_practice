mainModule.directive("file", [
  "jQuery",
  function (jQuery) {
    return {
      restrict: "A",
      scope: {
        "data": "="
      },
      link: function (scope, el, attrs) {
        jQuery(el).bind("change", function (event) {
          var files = event.target.files;

          if (files.length > 0) {
            scope.$apply(function () {
              scope.data = files[0];
            });
          } else {
            scope.$apply(function () {
              scope.data = null;
            });
          }
        });
      }
    }
  }
]);
