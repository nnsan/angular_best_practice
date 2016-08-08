mainModule.controller("asynchronous.controller", [
  "$scope",
  function ($scope) {
    $scope.viewManager = {
      view1: false,
      view2: false,
      view3: false,
      view4: false,
      view5: false,
      view6: false,
      view7: false,
      view8: false,
      view9: false,
      view10: false,
      view11: false,
      view12: false,
      view13: false,
      view14: false,
      view15: false
    };

    console.log("parent view render", Date.now());

    $scope.$watchGroup([
      "viewManager.view1", "viewManager.view2", "viewManager.view3", "viewManager.view4", "viewManager.view5",
      "viewManager.view6", "viewManager.view7", "viewManager.view8", "viewManager.view9", "viewManager.view10",
      "viewManager.view11", "viewManager.view12", "viewManager.view13", "viewManager.view14", "viewManager.view15"
    ], function (val) {
      var views = Object.keys(val);
      var counter = 0;

      for (var i = 0, len = views.length; i < len; i++) {
        var key = views[i];
        if (val[key] == false) {
          break;
        } else {
          counter++;
        }
      }

      if (counter == len - 1) {
        console.log("Finish render view", Date.now());
      }
    })
  }
]);
