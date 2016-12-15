
'use strict';
angular.module('starter.myInfo')
  .config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('tab.my-info-detail', {
          url: '/my-info-detail',
          views: {
            'tab-myInfo': {
              templateUrl: 'app/myInfo/my-info-detail.html',
              controller: 'MyInfoDetailCtrl'
            }
          },
          params:{
            myDetailInfo:''
          }
        })
    }]);
angular.module('starter.myInfo')
  .controller('MyInfoDetailCtrl', [
    '$scope',
    'baseConfig',
    '$ionicHistory',
    'hmsHttp',
    'hmsPopup',
    '$stateParams',
    function ($scope,
              baseConfig,
              $ionicHistory,
              hmsHttp,
              hmsPopup,
              $stateParams) {

      $scope.personalInfo=$stateParams.myDetailInfo;

      $scope.goBack=function(){//返回按钮
        $ionicHistory.goBack();
      }



    }])
