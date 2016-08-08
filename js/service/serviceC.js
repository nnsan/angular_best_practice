mainModule.factory("serviceC", [
  "$injector",
  //"serviceA",
  function ($injector, serviceA) {

    function doSomething () {
      var serviceA = $injector.get("serviceA");
      serviceA.doSomething();
      console.log("Service C -> doSomething");
    }

    return {
      doSomething: doSomething
    }
  }
]);
