(function(){
  var app = angular.module('starter', ['ionic']);

  app.controller('GammingCtrl', GammingCtrl);

  GammingCtrl.$inject = ['$http'];

  function GammingCtrl($http){
    var vm = this;
    $http.get('https://www.reddit.com/r/GameOverDigital/.json')
      .then(function(posts){
        angular.forEach(posts.data.data.children, function(child){
          vm.posts.push(child.data);
        });
      })
      .catch(function(data){});
    vm.posts = [];
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
