/**
 * Created by zhangren on 16/6/27.
 */
'use strict';
angular.module('starter.workFlow', [])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('tab.workFlow-waitThings', {
                    url: '/workFlow-waitThings',
                    views: {
                        'tab-workFlow': {
                            templateUrl: 'app/workFlow/waitThings.html',
                            controller: 'WaitThingsCtrl'
                        }
                    }
                })
                .state('tab.workflow-waitThingsDetail', {
                    url: '/workflowThings-detail',
                    views: {
                        'tab-workFlow': {
                            templateUrl: 'app/workFlow/waitThings-detail.html',
                            controller: 'WorkFLowDetailCtrl'
                        }
                    }
                })
                .state('tab.workflow-create', {
                    url: '/workflow-create',
                    views: {
                        'tab-workFlow': {
                            templateUrl: 'app/workFlow/create.html',
                            controller: 'WorkFLowCreateCtrl'
                        }
                    }
                });
        }])
    .controller('WorkFlowCtrl', function ($scope, $rootScope,
                                          $state,
                                          $stateParams,
                                          $ionicModal,
                                          $timeout,
                                          baseConfig,
                                          hmsPopup,
                                          workFLowListService,
                                          $ionicScrollDelegate, $cordovaToast,$ionicLoading) {

        $scope.goState = function (state, flag) {
            $state.go(state);
            $rootScope.isWaitThings = flag;
            $rootScope.tilteFlag = flag;
        };
        //new-dorm-apply-choose-apply-type
        //新建申请
        $ionicModal.fromTemplateUrl('app/workFlow/create.html', { //筛选modal
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.createModal = modal;
        });
        $scope.openModal = function () {
            $scope.createModal.show();
        };
        $scope.submit = function () {
            $cordovaToast.showShortBottom('提交成功');
            $scope.createModal.hide();

        };
        //选择modal
        $scope.flowType = '公出';
        $scope.transText = '飞机';
        $scope.typeArr = workFLowListService.typeArr;
        $ionicModal.fromTemplateUrl('app/workFlow/new-dorm-apply-choose-apply-type.html', { //筛选modal
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.typeModal = modal;
        });
        var chooseTemp;
        $scope.openTypeModal = function (type) {
            switch (type) {
                case 'flow':
                    $scope.typeArr = workFLowListService.typeArr;
                    chooseTemp = 'flow';
                    break;
                case 'trans':
                    $scope.typeArr = workFLowListService.transTools;
                    chooseTemp = 'trans';
            }
            $scope.typeModal.show();
        };
        $scope.oneFlag = true;
        $scope.twoFlag = false;
        $scope.thrFlag = false;
        $scope.chooseType = function (x) {
            switch (chooseTemp) {
                case 'flow':
                    $scope.flowType = x.name;
                    switch (x.name) {
                        case '合同':
                            $scope.oneFlag = false;
                            $scope.twoFlag = false;
                            $scope.thrFlag = true;
                            break;
                        case '报销':
                            $scope.oneFlag = false;
                            $scope.twoFlag = true;
                            $scope.thrFlag = false;
                            break;
                        default:
                            $scope.oneFlag = true;
                            $scope.twoFlag = false;
                            $scope.thrFlag = false;
                            break;
                    }
                    break;
                case 'trans':
                    $scope.transText = x.name;
            }
            angular.forEach($scope.typeArr, function (data) {
                data.checked = false;
            });
            x.checked = true;
            $scope.typeModal.hide();
        }
    })
    .controller('WorkFLowCreateCtrl', function ($scope,
                                                $state,
                                                $stateParams,
                                                $ionicModal,
                                                $timeout,
                                                baseConfig,
                                                workFLowListService,
                                                $ionicScrollDelegate) {


    })
    .controller('WaitThingsCtrl', function ($scope,$rootScope, $state, $ionicModal, $timeout, $ionicScrollDelegate, workFLowListService) {
        $scope.fetchDataFlag = true;
        $scope.refresh = function () {
            $timeout(function () {
                $scope.$broadcast('scroll.refreshComplete');
            }, 300);
        };
        $scope.listStatus = {
            todo: {
                selected: true
            },
            done: {
                selected: false
            }
        };
        $scope.enterWorkflowDetail = function () {
            if ($scope.listStatus.todo.selected&&$rootScope.isWaitThings) {
                $rootScope.isWaitThings = true;
            }else{
                $rootScope.isWaitThings = false;
            }
            $state.go('tab.workflow-waitThingsDetail');
        };
        //未处理
        $scope.fetchTodoList = function () {
            $ionicScrollDelegate.$getByHandle('workflowListHandle').scrollTop();
            $scope.listStatus = {
                todo: {
                    selected: true
                },
                done: {
                    selected: false
                }
            };
            $scope.fetchDataFlag = true;
            $scope.fetchDataFlag = false;
            $scope.list = workFLowListService.list;
        };
        $scope.fetchTodoList();
        //已处理
        $scope.fetchDoneList = function () {
            $ionicScrollDelegate.$getByHandle('workflowListHandle').scrollTop();
            $scope.listStatus = {
                todo: {
                    selected: false
                },
                done: {
                    selected: true
                }
            };
            $scope.fetchDataFlag = true;
            $scope.fetchDataFlag = false;
            $scope.list = [{
                title1: 'TimeSheet解冻申请',
                icon: 'img/application/profile@3x.png',
                type: '工作流类型',
                typeValue: 'TimeSheet解冻申请',
                node: '当前节点',
                nodeValue: '项目经理审批',
                submit: '提交',
                submitPerson: '成志唯'
            }];

        };
        //筛选Modal
        $scope.statusArr = workFLowListService.statusArr;
        $scope.typesArr = workFLowListService.typesArr;
        $scope.showProjectName = true;
        $ionicModal.fromTemplateUrl('app/workFlow/ts-filter-modal.html', { //筛选modal
            scope: $scope
        }).then(function (modal) {
            $scope.tsFilterModal = modal;
        });
        $scope.filterTsInfo = function () { //响应筛选按钮的方法
            $scope.tsFilterModal.show();
        };
        $scope.cancelFilter = function () {
            $scope.tsFilterModal.hide();
        };
        $scope.selectScreening = function (type) {
            if (type == 'status') {
                $scope.showProjectName = true;
            } else {
                $scope.showProjectName = false;
            }
        };
        $scope.selectFilterItem = function (x, arr) {
            angular.forEach(arr, function (data) {
                data.checked = false;
            });
            x.checked = true;
        };
        $scope.confirmFilter = function () {

        };
    })
    .controller('WorkFLowDetailCtrl', function ($scope,
                                                $state,
                                                $stateParams,
                                                $ionicModal,
                                                $timeout,
                                                $ionicScrollDelegate,$cordovaToast,
                                                baseConfig,
                                                workFLowListService,
                                                hmsPopup,
                                                $ionicHistory) {
        var detail = $stateParams.detail;
        var multipleArrayList = [];
        $scope.actionType = {
            "approve": "0",
            "reject": "-1",
            "back": "",
            "transmit": "3"
        };
        $scope.historyList = workFLowListService.historyList;
        $scope.singalArrayList = workFLowListService.singalArrayList;
        $scope.loadingDataFlag = false;
        $scope.multipleLine = [];
        $scope.workflowActionShowFlag = false;
        $scope.transmitPerson = [{
            name: '石顺'
        }, {
            name: '马云飞'
        }, {
            name: '成志唯'
        }];
        $scope.processExtroInfo = {
            "opinion": "",
            "transmitPerson": {
                "code": "",
                "name": ""
            }
        };
        $scope.transmitPersonFilter = {
            "value": ""
        };

        if (baseConfig.debug) {
            console.log('WorkFLowDetailCtrl.detail ' + angular.toJson(detail));
        }
        //加载项目画面
        $ionicModal.fromTemplateUrl('app/workflow/transmit-person.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.transmitPersonModal = modal;
        });
        $scope.selectTransmitPerson = function (person) {
            if (baseConfig.debug) {
                console.log("selectTransmitPerson.person " + angular.toJson(person));
            }
            $scope.processExtroInfo.transmitPerson = person;
            $scope.transmitPersonModal.hide();
        };
        $scope.hideTransmitPerson = function () {
            $scope.transmitPersonModal.hide();
        };
        $scope.chooseTransmitPerson = function () {
            $scope.transmitPersonModal.show();
        };

        $scope.searchTransmitPerson = function () {
            if (baseConfig.debug) {
                console.log('$scope.transmitPersonFilter.value ' + $scope.transmitPersonFilter.value);
            }
            if ($scope.transmitPersonFilter.value == '') {
                return '';
            } else {
                $scope.loadingDataFlag = true;
                var success = function (result) {
                    $scope.loadingDataFlag = false;
                    if (result.status == 'S') {
                        $scope.transmitPerson = result.employeeList;
                    }
                };
                var error = function (response) {
                };
                workFLowListService.getTransmitPerson(success, error, $scope.transmitPersonFilter.value);
            }
        };

        var processLine = function (line) {
            var oneLine = {
                title: line.line_big_title,
                arrayList: line.line,
                currentPage: 1,
                currentArray: []
            };
            if (line.line.length > 0) {
                var currentList = [];
                var lineTitle = line.line_title;
                var list = line.line[0].line_values;
                for (var i = 0; i < list.length; i++) {
                    var array = {
                        "name": lineTitle[i].line_title,
                        "value": list[i].line_value
                    };
                    currentList.push(array);
                }
                oneLine.currentArray = currentList;
            }
            return oneLine;
        };

        $scope.showContent = function (array) {
            if (!array.showFlag) {
                array.showFlag = true;
            } else {
                array.showFlag = false;
            }
            $ionicScrollDelegate.resize();
        };

        $scope.toBack = function (array) {
            if (array.currentPage <= 1) {
                return '';
            } else {
                var currentPage = array.currentPage - 1;
                array.currentPage = currentPage;
                for (var i = 0; i < array.currentArray.length; i++) {
                    array.currentArray[i].value = array.arrayList[currentPage - 1].line_values[i].line_value;
                }
            }
        };

        $scope.goForward = function (array) {
            if (array.currentPage >= array.arrayList.length) {
                return '';
            } else {
                var currentPage = array.currentPage + 1;
                array.currentPage = currentPage;
                for (var i = 0; i < array.currentArray.length; i++) {
                    array.currentArray[i].value = array.arrayList[currentPage - 1].line_values[i].line_value;
                }
            }
        };

        var validateWorkFlowAction = function (actionType) {
            if (actionType == $scope.actionType.approve) {
                return true;
            } else if (actionType == $scope.actionType.reject) {
                if ($scope.processExtroInfo.opinion == '') {
                    hmsPopup.showPopup('请输入拒绝原因!');
                    return false;
                }
                else {
                    return true;
                }
            } else if (actionType == $scope.actionType.transmit) {
                if ($scope.processExtroInfo.opinion == '') {
                    hmsPopup.showPopup('请输入转交原因!');
                    return false;
                }
                else {
                    return true;
                }
                if ($scope.processExtroInfo.transmitPerson.code == '') {
                    hmsPopup.showPopup('请输入转交人!');
                    return false;
                }
                else {
                    return true;
                }
            } else if (actionType == $scope.actionType.back) {
                return true;
            } else {
                hmsPopup.showPopup('请输入处理类型!');
                return false;
            }
        };

        $scope.submitAction = function (actionType) {
            var success = function (result) {
                //hmsPopup.showPopup('处理工作流成功!');
                //workFLowListService.setRefreshWorkflowList(true);
                $ionicHistory.goBack();
                $cordovaToast.showShortBottom('处理成功');
            };
            success();

            //workFLowListService.submitAction(success, error, params);
        };

    });
