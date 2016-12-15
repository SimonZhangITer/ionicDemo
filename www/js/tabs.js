angular.module('HmsModule').controller('TabsCtrl', ['$scope', '$rootScope', '$state',
  function ($scope, $rootScope, $state) {
    $rootScope.$on('$ionicView.beforeEnter', function () {
      var statename = $state.current.name;
      //tabs中存在的主页面不需要隐藏，hidetabs=false
      if (statename != 'tab.message' && statename != 'tab.application' &&
        statename != 'tab.contact' && statename != 'tab.myInfo') {
        $scope.hideTabs = true;
      }
    });

    $rootScope.$on('$ionicView.afterEnter', function () {
      var statename = $state.current.name;
      //tabs中存在的主页面不需要隐藏，hidetabs=false
      if (statename === 'tab.workFlow' || statename === 'tab.mail' ||
        statename === 'tab.contact' || statename === 'tab.myInfo') {
        $scope.hideTabs = false;
      }
    });
  }]);
