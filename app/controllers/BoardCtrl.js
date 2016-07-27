"use strict";

app.controller("BoardCtrl", function($scope, BoardStorage, AuthFactory, $location) {

  firebase.auth().onAuthStateChanged(function(){
    console.log("HI");
    // $location.url("/boards");
    // $scope.$apply();
  });

  $scope.boards = [];

  BoardStorage.getBoards(AuthFactory.getUser())
  .then( function (boardCollection) {
    $scope.boards = boardCollection;
  });

  console.log("boards", $scope.boards);

  $scope.delete = function (id) {
    BoardStorage.deleteBoard(id)
    .then(function() {
      console.log("deleted");
      BoardStorage.getBoards(AuthFactory.getUser())
      .then(function(boardCollection) {
        console.log("board collection", boardCollection);
        $scope.boards = boardCollection;
      });
    });
  };


});