mainModule.directive("integer", function () {
  var _integerRegex = /^\d*$/;

  return {
    require: "ngModel",
    link: function (scope, el, attrs, ngModelController) {
      ngModelController.$validators.integer = function (modelVal, viewVal) {
        return (ngModelController.$isEmpty(modelVal) || _integerRegex.test(viewVal));
      };
    }
  }
});
