(function (window) {
  angular.module("app", ["ngRoute", "ngSanitize"]);

  // Expose API:
  window.bootstrap = bootstrap;

  function bootstrap (element) {
    angular.element(document).ready(function () {
      angular.bootstrap(element, ["app"]);
    });
  }
})(window);

// Configure module
(function (module) {
  module.config(Configuration);

  Configuration.$inject = ["$routeProvider"];
  function Configuration ($routeProvider) {
    $routeProvider.when("/", {
      templateUrl: "home.html",
      controller: "HomeController",
      controllerAs: "vm"
    }).when("/scope-ngif", {
      templateUrl: "scope.ngif.html",
      controller: "ScopeController",
      controllerAs: "vm"
    }).when("/scope-watch", {
      templateUrl: "scope.watch.html",
      controller: "ScopeController",
      controllerAs: "vm"
    }).when("/directive-manipulate-dom", {
      templateUrl: "directive.manipulate.dom.html",
      controller: "DirectiveManipulateDOMController",
      controllerAs: "vm"
    }).when("/view-rendering-timeout", {
      templateUrl: "asynchronous.view.rendering.html",
      controller: "ViewRenderingController",
      controllerAs: "vm"
    }).when("/manually-compile-template", {
      templateUrl: "manually.compile.template.html",
      controller: "ManuallyCompileTemplateController",
      controllerAs: "vm"
    }).when("/custom-form-validation", {
      templateUrl: "custom.form.validation.html",
      controller: "CustomValidationController",
      controllerAs: "vm"
    }).when("/blob-image", {
      templateUrl: "blob.image.html",
      controller: "BlobImageController",
      controllerAs: "vm"
    });

    $routeProvider.otherwise({
      redirectTo: '/'
    });
  }
})(angular.module("app"));

// HomeController
(function (module) {
  module.controller("HomeController", HomeController);

  HomeController.$inject = ["$location"];
  function HomeController ($location) {
    var vm = this;
    vm.greeting = "Hello World! Welcome to the Angular Best practice";
    vm.accessPage = accessPage;

    function accessPage (pageId) {
      switch (pageId) {
        case "$scopeAndNgIf":
          $location.path("/scope-ngif");
          break;
        case "$scopeWatch":
          $location.path("/scope-watch");
          break;
        case "directiveManipulateDOM":
          $location.path("/directive-manipulate-dom");
          break;
        case "viewRenderingWithTimeout":
          $location.path("/view-rendering-timeout");
          break;
        case "manuallyCompileTemplate":
          $location.path("/manually-compile-template");
          break;
        case "customFormValidation":
          $location.path("/custom-form-validation");
          break;
        case "blobImage":
          $location.path("/blob-image");
          break;
        default:
          $location.path("/");
      }
    }
  }
})(angular.module("app"));

// ScopeController
(function (module) {
  module.controller("ScopeController", ScopeController);

  ScopeController.$inject = ["$scope", "$filter"];
  function ScopeController ($scope, $filter) {
    var vm = this;
    var dateFormat = "yy-MM-dd H:mm:ss";

    $scope.users = [
      {username: "Mary", points: 310},
      {username: "June", points: 290},
      {username: "Bob", points: 300}
    ];
    vm.addUserToList = doAddUserToList;
    vm.setUsers = doSetUsers;
    vm.setValueForFirstElement = doSetValueForFirstElement;
    vm.usersWatchByReferenceAt = "";
    vm.usersWatchByCollectionAt = "";
    vm.usersWatchByValueAt = "";

    //$watch strategies
    $scope.$watch("users", listenUserByReference);
    $scope.$watchCollection("users", listenUserByCollection);
    $scope.$watch("users", listenUserByValue, true);

    function doSetUsers () {
      var users = angular.copy($scope.users);
      users.push({
        username: $scope.username,
        points: $scope.points
      });

      $scope.users = users;
    }
    function doAddUserToList() {
      $scope.users.push({
        username: $scope.username,
        points: $scope.points
      });
    }
    function doSetValueForFirstElement() {
      var firstElement = $scope.users[0];
      firstElement.username = $scope.username;
      firstElement.points = $scope.points;
    }
    function listenUserByReference() {
      vm.usersWatchByReferenceAt = $filter("date")(new Date(), dateFormat);
    }
    function listenUserByCollection() {
      vm.usersWatchByCollectionAt = $filter("date")(new Date(), dateFormat);
    }
    function listenUserByValue() {
      vm.usersWatchByValueAt = $filter("date")(new Date(), dateFormat);
    }
  }
})(angular.module("app"));

// DirectiveManipulateDOMController
(function (module) {
  module.controller("DirectiveManipulateDOMController", DirectiveManipulateDOMController);

  DirectiveManipulateDOMController.$inject = [];
  function DirectiveManipulateDOMController() {
    //TODO
  }
})(angular.module("app"));

//ViewRenderingController
(function (module) {
  module.controller("ViewRenderingController", ViewRenderingController);

  ViewRenderingController.$inject = ["$timeout", "$scope", "$document"];
  function ViewRenderingController($timeout, $scope, $document) {
    $scope.$on("$viewContentLoaded", function () {
      // Can get normal template
      //var normalTemplate = $document.find(".normal-template");
      //alert("normal-template: " + normalTemplate.length);

      //var phoneListElement = $document.find(".phone-list-container");
      //alert("phoneListElement: " + phoneListElement.length);

      // Cannot get asynchronous view
      //var phoneFieldItems = $document.find(".field-inline");
      //alert("phoneFieldItems: " + phoneFieldItems.length);

      //$timeout (function () {
      //  var phoneItems = $document.find(".phone-detail");
      //  alert("phoneItems: " + phoneItems.length);
      //});
    });
  }
})(angular.module("app"));

//ManuallyCompileTemplateController
(function (module) {
  module.controller("ManuallyCompileTemplateController", ManuallyCompileTemplateController);

  ManuallyCompileTemplateController.$inject = ["$scope", "$compile", "$document"];
  function ManuallyCompileTemplateController ($scope, $compile, $document) {
    var vm = this;

    vm.compileTemplate = doCompileTemplate;
    vm.data = {
      username: "Monkey",
      age: 1
    };
    $scope.username = "San Nguyen";

    function doCompileTemplate (htmlTemplate) {
      var template = angular.element(htmlTemplate);
      var linkFn = $compile(template);
      var htmlView = linkFn($scope);
      var container = $document.find("#html-view-container");

      if (container && container.length > 0) {
        container.append(htmlView);
      }
    }
  }
})(angular.module("app"));

//CustomValidationController
(function (module) {
  module.controller("CustomValidationController", CustomValidationController);

  CustomValidationController.$inject = [];
  function CustomValidationController() {
    var vm = this;

    vm.name = "San Nguyen";
    vm.age = 27;
  }
})(angular.module("app"));

// BlobImageController
(function (module) {
  module.controller("BlobImageController", BlobImageController);

  BlobImageController.$inject = ["$scope", "$window"];
  function BlobImageController ($scope, $window) {
    var vm = this;

    var backupFile = null;
    $scope.userProfile = null;
    $scope.previewProfile = null;
    $scope.onCancel = onCancel;

    $scope.$watch("userProfile", handleChangeUserProfile);

    function handleChangeUserProfile (newVal, oldVal) {
      if (oldVal && oldVal instanceof Blob) {
        backupFile = cloneBlob(oldVal);
      }

      if (newVal && newVal instanceof Blob) {
        var windowURL = $window.URL ||$window.webkitURL;

        $scope.previewProfile = windowURL.createObjectURL(newVal);
      }
    }

    function onCancel () {
      $scope.userProfile = backupFile;
    }

    function cloneBlob (file) {
      if (file && file instanceof Blob) {
        return file.slice();
      } else {
        return null;
      }
    }
  }
})(angular.module("app"));

// commonUtil
(function (module) {
  module.factory("commonUtil", CommonService);

  CommonService.$inject = ["userService"];
  function CommonService (userService) {
    return {
      storeCookie: storeCookie,
      isEmptyData: isEmptyData,
      validateIsDigital: validateIsDigital,
      validateIsEmail: validateIsEmail
    };

    function storeCookie () {
      var user = userService.getCurrentUser();

      //TODO - Store cookie data
    }

    function isEmptyData (value) {
      //TODO - Check whether value is empty object or not
      return true;
    }

    function validateIsDigital (value) {
      var _integerRegex = /^\d*$/;
      return _integerRegex.test(value);
    }

    function validateIsEmail (value) {
      var _emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      return _emailRegex.test(value);
    }
  }
})(angular.module("app"));

// baseService
(function (module) {
  module.factory("baseService", BaseService);

  BaseService.$inject = ["commonUtil"];
  function BaseService (commonUtil) {
    return {
      callGetAPI: callGetAPI
    };

    function callGetAPI (url) {
      if (commonUtil.isEmtyData(url)) {
        return;
      }

      //TODO - return promise for ajax request
    }
  }
})(angular.module("app"));

// userService
(function (module) {
  module.factory("userService", UserService);

  UserService.$inject = ["$injector"];
  function UserService ($injector) {
    var currentUser = {};

    return {
      retrieveData: retrieveData,
      getCurrentUser: getCurrentUser,
      isAdmin: isAdmin
    };

    function isAdmin () {
      return currentUser["role"] == 1;
    }

    function retrieveData () {
      var baseService = $injector.get("baseService");

      baseService.callGetAPI("http://127.0.0.1/api/user").then(function (data) {
        currentUser = data;
      });
    }

    function getCurrentUser () {
      return angular.copy(currentUser);
    }
  }

})(angular.module("app"));

// fileDirective
(function (module) {
  module.directive("file", FileDirective);

  FileDirective.$inject = [];
  function FileDirective () {
    var constructor = {
      restrict: "EA",
      scope: {
        "data": "="
      },
      link: linkFn
    };

    return constructor;

    function linkFn ($scope, element, attrs) {
      element.bind("change", function (event) {
        var files = event.target.files;

        if (files.length > 0) {
          $scope.$apply(function () {
            $scope.data = files[0];
          });
        } else {
          $scope.$apply(function () {
            $scope.data = null;
          });
        }
      });
    }
  }
})(angular.module("app"));

// Integer directive
(function (module) {
  module.directive("integer", IntegerDirective);

  IntegerDirective.$inject = ["commonUtil"];
  function IntegerDirective (commonUtil) {
    var constructor = {
      restrict: "EA",
      require: "ngModel",
      link: linkFn
    };

    return constructor;

    function linkFn ($scope, element, attrs, ngModelController) {
      ngModelController.$validators.integer = function (modelVal, viewVal) {
        return (ngModelController.$isEmpty(modelVal) || commonUtil.validateIsDigital(viewVal));
      };
    }
  }
})(angular.module("app"));

// phoneList directive
(function (module) {
  module.directive("phoneList", PhoneListDirective);

  PhoneListDirective.$inject = ["$timeout"];
  function PhoneListDirective ($timeout) {
    return {
      restrict: "AE",
      scope: {

      },
      link: linkFn,
      templateUrl: "phone.list.directive.html",
      controller: PhoneListController,
      controllerAs: "vm"
    };

    function linkFn ($scope, element, attrs) {
      // Can get view of normal template
      //var fields = element.find(".field-inline");
      //alert("fields: " + fields.length);

      // Cannot get view of asynchronous template
      //var phoneItem = element.find(".phone-detail");
      //alert("phoneItem: " + phoneItem.length);

      // Must using $timeout to get asynchronous template
      //$timeout(function () {
      //  var phoneItem = element.find(".phone-detail");
      //  alert("phoneItem: " + phoneItem.length);
      //});
    }
  }

  PhoneListController.$inject = [];
  function PhoneListController () {
    var vm = this;
    vm.categories = [
      {name: "Price", key: "price"},
      {name: "Manufacture", key: "manufacture"}
    ];
    vm.phones = [
      {name: "iphone 5", description: "Description for iphone 5", url: "http://a.deviantart.net/avatars/d/r/drawing-manga.png?4", price: 500, manufacture: "apple"},
      {name: "iphone 4", description: "Description for iphone 4", url: "http://a.deviantart.net/avatars/d/r/drawing-manga.png?4", price: 400, manufacture: "apple"},
      {name: "Note 7", description: "Description for note 7", url: "http://a.deviantart.net/avatars/d/r/drawing-manga.png?4", price: 600, manufacture: "samsung"}
    ];
  }

})(angular.module("app"));

// phoneInfo directive
(function (module) {
  module.directive("phoneInfo", PhoneInfoDirective);

  PhoneInfoDirective.$inject = [];
  function PhoneInfoDirective () {
    return {
      restrict: "AE",
      scope: {
        data: "="
      },
      link: linkFn,
      templateUrl: "phone.info.directive.html"
    };

    function linkFn ($scope, element, attrs) {

    }
  }
})(angular.module("app"));
