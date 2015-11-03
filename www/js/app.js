(function(){
  var app = angular.module('starter', ['ionic']);

  app.controller('GammingCtrl', GammingCtrl);

  GammingCtrl.$inject = [];

  function GammingCtrl(){
    var vm = this;
    vm.posts = [
      {title: 'Primer post'},
      {title: 'Segundo post'}
    ];
    console.log(123);
  }

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });
})();
