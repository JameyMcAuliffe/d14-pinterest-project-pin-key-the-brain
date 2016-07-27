"use strict";

app.controller("NewPinCtrl", function($scope, $routeParams, PinStorage, $location) {

  $scope.newPin = {
    title: "",
    desc: "",
    url: ""
  }

  $scope.addNewPin = function() {
    PinStorage.postNewPin($scope.newPin, $routeParams.boardId)
    .then(function() {
      $location.url("/boards");
    })
  };

});