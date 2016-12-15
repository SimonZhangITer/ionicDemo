/**
 * Created by zhangren on 16/6/27.
 */
'use strict';
angular.module('starter.mail', [])
    .controller('MailCtrl', function ($scope, $state, $timeout, $ionicPlatform,$ionicModal) {
        console.log('mailCtrl');
        $scope.mailArr = [{
            from: 'linjingrongm',
            subject: '周末公司空调维修通知',
            content: '因公司空调水泵电磁阀损坏,需在周六(25日)晚上9点至周日(26日)早上6点进行维修,维修期间将关闭公司空调系统',
            time: '16:24',
            isRead: false
        }, {
            from: 'linjingrongm',
            subject: '周末公司空调维修通知',
            content: '因公司空调水泵电磁阀损坏,需在周六(25日)晚上9点至周日(26日)早上6点进行维修,维修期间将关闭公司空调系统',
            time: '22:12',
            isRead: false
        }, {
            from: 'linjingrongm',
            subject: '周末公司空调维修通知',
            content: '因公司空调水泵电磁阀损坏,需在周六(25日)晚上9点至周日(26日)早上6点进行维修,维修期间将关闭公司空调系统',
            time: '昨天',
            isRead: false
        }, {
            from: 'linjingrongm',
            subject: '周末公司空调维修通知',
            content: '因公司空调水泵电磁阀损坏,需在周六(25日)晚上9点至周日(26日)早上6点进行维修,维修期间将关闭公司空调系统',
            time: '星期五',
            isRead: false
        }];
        $scope.messageList = [];
        //将页面的导航bar设置成白色
        $ionicPlatform.ready(function () {
            if (window.StatusBar) {
                StatusBar.styleLightContent();
            }
        });
        $scope.talk = function (message) {
            console.log('$scope.talk');
            $state.go("tab.messageDetail", {message: message});
        };

        $scope.refresh = function () {
            $timeout(function () {
                $scope.$broadcast("scroll.refreshComplete");
            }, 2000);
        };
        $scope.goDetail = function (x) {
            x.isRead = true;
            $state.go('tab.mail-detail');
        };
        //新建邮件
        $ionicModal.fromTemplateUrl('app/mail/createMail.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        $scope.$on('$ionicView.enter', function (e) {
            console.log('messageCtrl.$ionicView.enter');
        });

        $scope.$on('$destroy', function (e) {
            console.log('messageCtrl.$destroy');
            $scope.modal.remove();
        });
    })
    .controller('MailDetailCtrl', function ($scope, $ionicHistory, $timeout, $ionicPlatform) {
        console.log('detail');
        $scope.goBack = function () {//返回按钮
            $ionicHistory.goBack();
        }
    });
