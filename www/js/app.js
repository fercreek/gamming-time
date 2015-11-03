(function(){
  var app = angular.module('starter', ['ionic', 'angularMoment']);

  app.controller('GammingCtrl', GammingCtrl);

  GammingCtrl.$inject = ['$http', '$scope'];

  function GammingCtrl($http, $scope){
    var vm = this;
    vm.posts = [];

    vm.loadMore = loadMore;
    vm.doRefresh = doRefresh;
    vm.openLink = openLink;

    function openLink(url){
      window.open(url, '_blank');
    }

    function doRefresh(){
      if (vm.posts.length > 0) {
        var params2 = {'before': vm.posts[0].name};
      } else {
        return ;
      }
      $http.get('https://www.reddit.com/r/gaming/new/.json', {params: params2})
        .then(function(posts){
          var newPosts = [];
          angular.forEach(posts.data.data.children, function(child){
            newPosts.push(child.data);
          });
          vm.posts = newPosts.concat(vm.posts);
          $scope.$broadcast('scroll.refreshComplete');
        })
        .catch(function(data){});
    }

    function loadMore(){
      var params2 = {};
      if (vm.posts.length > 0) {
        params2.after = vm.posts[vm.posts.length - 1].name;
      }
      $http.get('https://www.reddit.com/r/gaming/new/.json', {params: params2})
        .then(function(posts){
          angular.forEach(posts.data.data.children, function(child){
            vm.posts.push(child.data);
          });
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
        .catch(function(data){});
    }

    $http.get('https://www.reddit.com/r/gaming/new/.json')
      .then(function(posts){
        angular.forEach(posts.data.data.children, function(child){
          vm.posts.push(child.data);
        });
      })
      .catch(function(data){});
  }

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.cordova && window.cordova.InAppBrowser){
        window.open = window.cordova.InAppBrowser.open;
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });
})();
