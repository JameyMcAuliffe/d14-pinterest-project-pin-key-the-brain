"use strict";

app.controller("EditPinCtrl", function($scope, $routeParams, PinStorage, $location) {

  $scope.pin = [];

  PinStorage.getPins()
  .then(function(returnedPins) {
    $scope.pin = returnedPins;
    $scope.selectedPin = $scope.pin.filter(function(each) {      
      return each.id === $routeParams.pinId;
    })[0];
  });

  $scope.editedPin = {
    title: "",
    url: "",
    desc: ""
  }

  $scope.putEditPin = function() {
    PinStorage.putPin($routeParams.pinId, $scope.editedPin)
    .then(function(message) {

      console.log(message);
      $location.url("/boards");
    })

  };

  

});