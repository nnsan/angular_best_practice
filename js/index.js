"use strict;"

var mainModule = angular.module("angularBestPractice", ["ngRoute"]);

// TODO bootstrap application
angular.element(document).ready(function () {
  angular.bootstrap(document, ["angularBestPractice"]);
});

// TODO Configure router
mainModule.config([
  "$routeProvider", "$httpProvider", "$locationProvider",
  function (
    $routeProvider, $httpProvider, $locationProvider
  ) {
    // https://docs.angularjs.org/api/ng/provider/$httpProvider
    $httpProvider.defaults.withCredentials = false;

    $routeProvider.when("/", {
      templateUrl: function () {
        return "views/home.html";
      },
      controller: "home.controller",
      controllerAs: "homeCtrl",
      access: {
        requireAdmin: false,
        requireLogin: true
      }
    }).when("/form", {
      templateUrl: "views/form.html",
      controller: "form.controller",
      controllerAs: "formCtrl"
    });

    $routeProvider.otherwise({
      templateUrl: function () {
        return "views/error.html";
      }
    });

    // https://docs.angularjs.org/guide/$location
    //$locationProvider.html5Mode(true)
  }
]);

/*
This function must be run before application bootstrap
It's available with trend "You have all privileges on page which you see"
If you must authorize on each feature of a page - you have to do validation on this page.
*/
function handleRouterChanging(module) {
  module.run([
    "$rootScope",
    function ($rootScope) {
      $rootScope.$on("$routeChangeStart", function (event, next) {
        var route = next.$$route;

        if (route && route.hasOwnProperty("access")) {
          // TODO Trigger authorization progress
        }
      });
    }
  ]);
}
