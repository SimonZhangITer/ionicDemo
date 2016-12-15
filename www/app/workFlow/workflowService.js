/**
 * Created by gusenlin on 16/6/21.
 */
angular.module('starter.workFlow')
    .service('workFLowListService', ['hmsHttp',
        'baseConfig',
        'hmsPopup',
        function (hmsHttp,
                  baseConfig,
                  hmsPopup) {
            var refreshWorkflowList = {
                flag: false
            };

            this.setRefreshWorkflowList = function (flag) {
                refreshWorkflowList.flag = flag;
            };
            this.list = [{
                title1: 'TimeSheet解冻申请',
                icon: 'img/application/profile@3x.png',
                type: '工作流类型',
                typeValue: 'TimeSheet解冻申请',
                node: '当前节点',
                nodeValue: '项目经理审批',
                submit: '提交',
                submitPerson: '成志唯'
            }, {
                title1: 'TimeSheet解冻申请',
                icon: 'img/application/profile@3x.png',
                type: '工作流类型',
                typeValue: 'TimeSheet解冻申请',
                node: '当前节点',
                nodeValue: '项目经理审批',
                submit: '提交',
                submitPerson: '成志唯'
            }, {
                title1: 'TimeSheet解冻申请',
                icon: 'img/application/profile@3x.png',
                type: '工作流类型',
                typeValue: 'TimeSheet解冻申请',
                node: '当前节点',
                nodeValue: '项目经理审批',
                submit: '提交',
                submitPerson: '成志唯'
            }, {
                title1: 'TimeSheet解冻申请',
                icon: 'img/application/profile@3x.png',
                type: '工作流类型',
                typeValue: 'TimeSheet解冻申请',
                node: '当前节点',
                nodeValue: '项目经理审批',
                submit: '提交',
                submitPerson: '成志唯'
            }, {
                title1: 'TimeSheet解冻申请',
                icon: 'img/application/profile@3x.png',
                type: '工作流类型',
                typeValue: 'TimeSheet解冻申请',
                node: '当前节点',
                nodeValue: '项目经理审批',
                submit: '提交',
                submitPerson: '成志唯'
            }];


            this.historyList = [{
                "creation_date": "2016-06-26 13:57",
                "comment_text": "顾森林",
                "name": "杨虹宇",
                "node_name": "项目经理审批",
                "action_title": "转交"
            },
                {
                    "creation_date": "2016-06-26 15:29",
                    "comment_text": "顾",
                    "name": "顾森林",
                    "node_name": "项目经理审批",
                    "action_title": "转交"
                },
                {
                    "creation_date": "2016-06-26 15:29",
                    "comment_text": "顾",
                    "name": "顾森林",
                    "node_name": "项目经理审批",
                    "action_title": "转交"
                },
                {
                    "creation_date": "2016-06-26 18:59",
                    "comment_text": "顾森林",
                    "name": "顾森林",
                    "node_name": "项目经理审批",
                    "action_title": "转交"
                }];


            this.singalArrayList = [{
                detail_title: '休假申请',
                showFlag: true,
                detail: [{
                    item_name: '休假类型',
                    item_value: '额外福利年假'
                }, {
                    item_name: '剩余天数',
                    item_value: '6'
                }, {
                    item_name: '起始日期',
                    item_value: '2016-07-01 08:30:00'
                }, {
                    item_name: '截止日期',
                    item_value: '2016-07-08 17:30:00'
                }, {
                    item_name: '总天数',
                    item_value: '6'
                }, {
                    item_name: '申请描述',
                    item_value: ''
                }]
            }];

            this.typeArr = [{
                name: '公出', checked: true
            }, {
                name: '报销'
            }, {
                name: '预算'
            }, {
                name: '预算变更'
            }, {
                name: '预算'
            }, {
                name: '立项'
            }, {
                name: '邀标'
            }, {
                name: '中标'
            }, {
                name: '合同'
            }, {
                name: '付款'
            }];


            this.transTools = [{name: '飞机', checked: true}, {name: '火车'}, {name: '客车'}];


            this.statusArr = [{
                status_name: '全部',
                checked: true
            }, {status_name: '审批中'}, {status_name: '同意'}, {status_name: '不同意'}];
            this.typesArr = [{
                type_name: '全部',
                checked: true
            }, {type_name: '日常'}, {type_name: '出差'}, {type_name: '外勤'}, {type_name: '借款'}
                , {type_name: '休假'}, {type_name: '报销'}, {type_name: '公文'}, {type_name: '其他'}];
        }]);
