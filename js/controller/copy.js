mainModule.controller("copy", [
  "$scope",
  "$window",
  function ($scope, $window) {
    var me = this;
    var backupFile = null;
    $scope.userProfile = null;
    $scope.previewProfile = null;

    $scope.$watch("userProfile", function (val, oldVal) {
      if (oldVal && oldVal instanceof Blob) {
        backupFile = me.cloneBlob(oldVal);
      }

      if (val && val instanceof Blob) {
        var windowURL = $window.URL ||$window.webkitURL;
        var imageUrl = windowURL.createObjectURL(val);
        $scope.previewProfile = imageUrl;
      }
    });

    $scope.onCancel = function () {
      $scope.userProfile = backupFile;
    };

    this.cloneBlob = function (file) {
      if (file && file instanceof Blob) {
        return file.slice();
      } else {
        return null;
      }
    };
  }
]);
