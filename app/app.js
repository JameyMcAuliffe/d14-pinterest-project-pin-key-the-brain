"use strict";

var app = angular.module("Pinterest", ['ngRoute'])
.constant('FirebaseURL', "https://pinkey-brain.firebaseio.com");

app.config(function($routeProvider, FBCreds) {

  let authConfig = {
    apiKey: FBCreds.apiKey,
    authDomain: FBCreds.authDomain,
    databaseURL: FBCreds.databaseURL,
    storageBucket: FBCreds.storageBucket
  };

  firebase.initializeApp(authConfig);

  $routeProvider.
  when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'LoginCtrl'
  }).
  when('/boards', {
    templateUrl: 'partials/board-view.html',
    controller: 'BoardCtrl'
  }).
  when('/boards/new', {
    templateUrl: 'partials/new-board.html',
    controller: 'NewBoardCtrl'
  }).
  when('/boards/:boardId', {
    templateUrl: 'partials/pin-view.html',
    controller: 'PinCtrl'
  }).
  when('/boards/pins/new/:boardId', {
    templateUrl: 'partials/new-pin.html',
    controller: 'NewPinCtrl'
  }).
  when('/boards/pins/edit/:pinId', {
    templateUrl: 'partials/edit-pin.html',
    controller: 'EditPinCtrl'
  }).
  otherwise('/boards');

});