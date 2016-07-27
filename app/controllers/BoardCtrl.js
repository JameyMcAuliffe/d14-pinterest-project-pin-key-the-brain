"use strict";

app.controller("BoardCtrl", function($scope, BoardStorage, AuthFactory, $location) {
  
  firebase.auth().onAuthStateChanged(function(){
    console.log("HI");
    // $location.url("/boards");
    // $scope.$apply();
  });

  BoardStorage.getBoards(AuthFactory.getUser())
  .then( function (boardCollection) {
    $scope.boards = boardCollection;
  });

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