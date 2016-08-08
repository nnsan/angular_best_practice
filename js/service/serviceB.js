mainModule.factory("serviceB", [
  "serviceC",
  function (serviceC) {
    function doSomething () {
      console.log("Service B -> doSomething");
    }

    function doAnotherThing () {
      serviceC.doSomething();
      console.log("Service B -> doAnotherThing");
    }

    return {
      doSomething: doSomething,
      doAnotherThing: doAnotherThing
    }
  }
]);
