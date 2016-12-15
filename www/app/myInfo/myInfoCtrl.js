/**
 * Created by zhangren on 16/6/27.
 */
'use strict';
angular.module('starter.myInfo', [])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('tab.myInfo-setUp', {
                    url: '/myInfo-setUp',
                    views: {
                        'tab-myInfo': {
                            templateUrl: 'app/myInfo/setup.html',
                            controller: 'setUpCtrl'
                        }
                    }
                })
                .state('tab.myInfo-feedback', {
                    url: '/myInfo-feedback',
                    views: {
                        'tab-myInfo': {
                            templateUrl: 'app/myInfo/feedback.html',
                            controller: 'FeedbackCtrl'
                        }
                    }
                });
        }])
    .controller('MyInfoCtrl', function ($scope,
                                        $state,
                                        baseConfig,
                                        hmsHttp,
                                        hmsPopup) {
        console.log('myInfo');
        $scope.personalInfo = "";
        $scope.defaultPortrait = "img/myInfo/man-portrait.png";
        $scope.logout = function () {//注销登录
            window.localStorage.token = "";
            window.localStorage.password = "";
            window.localStorage.timesheetAuto = "";
            window.localStorage.messagePush = "";
            $state.go('login');
        };
        $scope.setup = function () {//进入设置界面
            $state.go('tab.myInfo-setUp');
        };

        $scope.feedback = function () {//进入反馈界面
            $state.go('tab.myInfo-feedback');
        };
        $scope.checkMyInfo = function () {//进入查看我的信息界面
            $state.go('tab.my-info-detail');
        };
        $scope.$on('$ionicView.enter', function (e) {
            if (baseConfig.debug) {
                console.log('myInfoCtrl.$ionicView.enter');
            }
        });
        $scope.$on('$destroy', function (e) {
            if (baseConfig.debug) {
                console.log('myInfoCtrl.$destroy');
            }
        });
    })
    .controller('setUpCtrl', function ($scope,
                                        $state,
                                        baseConfig,
                                        hmsHttp,
                                        hmsPopup) {

    })
    .controller('FeedbackCtrl', [
        '$scope',
        'baseConfig',
        '$ionicHistory',
        'hmsHttp',
        'hmsPopup',
        function ($scope,
                  baseConfig,
                  $ionicHistory,
                  hmsHttp,
                  hmsPopup) {

            $scope.qualityIssue=[false,false,false,false];//反馈问题类型样式
            $scope.feedbackInfo={//反馈信息
                info:""
            };
            $scope.selectQualityIssue=function(num){//选择反馈问题类型
                angular.forEach($scope.qualityIssue,function(data,index,array){
                    array[index]=false;
                });
                $scope.qualityIssue[num]=true;
            };
            $scope.goBack=function(){//返回按钮
                $ionicHistory.goBack();
            };

            $scope.commit=function(){//提交反馈
                var i=0;
                angular.forEach($scope.qualityIssue,function(data,index,array){
                    if(array[index]==false){
                        i++;
                    }
                });
                if(i==$scope.qualityIssue.length){
                    hmsPopup.showShortCenterToast('请选择反馈问题类型');
                }else if($scope.feedbackInfo.info==""){
                    hmsPopup.showShortCenterToast('请填写产品质量问题反馈');
                }
            }
        }]);
