"use strict";

app.factory("PinStorage", function(FirebaseURL, $q, $http) {

  let getPins = function () {
    let pins = [];
    return $q(function(resolve, reject) {
      $http.get(`${FirebaseURL}/pin.json`)
      .success(function(pinObject){
        if (pinObject) {
          Object.keys(pinObject).forEach(function(key) {
            pinObject[key].id = key;
            pins.push(pinObject[key]);
          });
        }
        resolve(pins);
        })
        .error(function(error){
          reject(error);
      });
    });
  };

  let putPin = function(pinId, pinObj) {
    return $q(function(resolve, reject) {
      $http.patch(
        `${FirebaseURL}/pin/${pinId}.json`,
          JSON.stringify(pinObj)   
      )
      .success(function(message) {
        resolve(message);
      })
      .error(function(error) {
        reject(error);
      });
    });
  };

  let postNewPin = function (newPin, boardId) {
    newPin.fb_b_key = boardId;
    return $q(function(resolve, reject) {
      $http.post(
        `${FirebaseURL}/pin.json`,
        JSON.stringify(newPin)
      )
      .success(function(ObjFromFirebase) {
        resolve(ObjFromFirebase);
      })
      .error(function(error) {
        reject(error);
      });
    });
  };

  let deletePin = function (id) {
    return $q(function (resolve, reject) {
      $http.delete(
        `${FirebaseURL}/pin/${id}.json`
        )
      .success(function() {
        resolve();
      })
      .error(function(error) {
        reject(error);
      });
    });
  };

  return {
    getPins, postNewPin, deletePin, putPin
  };

});