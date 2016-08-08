mainModule.factory("serviceA", [
  "jQuery",
  "serviceB",
  function (jQuery, serviceB) {
    function doSomething () {
      serviceB.doSomething();
      console.log("Service A -> doSomething");
    }

    return {
      doSomething: doSomething
    }
  }
]);
