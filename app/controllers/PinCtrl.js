"use strict";

app.controller("PinCtrl", function($scope, $location, PinStorage, $routeParams) {

  $scope.newPinId = $routeParams.boardId;

  PinStorage.getPins()
  .then(function(pinCollection) {
    $scope.pins = pinCollection;
    $scope.pins = $scope.pins.filter(function (pin) {
      return pin.fb_b_key === $routeParams.boardId;
    });
  });  

  $scope.editThisPin = function(pinId) {
    $location.url(`/boards/pins/edit/:${pinId}`);
    //go to a new page
  }

  $scope.delete = function (id) {
    PinStorage.deletePin(id)
    .then(function() {
      console.log("deleted");
      PinStorage.getPins()
      .then(function(pinCollection) {
        console.log("pin collection", pinCollection);
        $scope.pins = pinCollection;
        $scope.pins = $scope.pins.filter(function (pin) {
          return pin.fb_b_key === $routeParams.boardId;
        });
      });
    });
  };

});