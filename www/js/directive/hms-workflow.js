/**
 * Created by gusenlin on 2016/6/12.
 */
"use strict";
HmsModule.directive('hmsWorkflowList', function () {
  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    scope: {
      title: '=workflowTitle',
      icon: '=workflowIcon',
      type: '=workflowType',
      typeValue: '=workflowTypeValue',
      node: '=workflowNode',
      nodeValue: '=workflowNodeValue',
      submit: '=workflowSubmit',
      submitPerson: '=workflowSubmitPerson'
    },

    template: '<a class="workflow-list">' +
    '<div class="workflow-list-logo">' +
    '<img src="{{icon}}"/>' +
    '</div>' +
    '<div class="workflow-list-header">{{title}}</div>' +
    '<div class="workflow-list-content">' +
    '<div class="row no-padding">' +
    '<div class="col col-90 no-padding">' +
    '<div class="row no-padding"> ' +
    '<div class="col col-33 no-padding color-type">{{type}}</div>' +
    '<div class="col col-67 no-padding color-content">{{typeValue}}</div>' +
    '</div>' +
    '<div class="row no-padding">' +
    '<div class="col col-33 no-padding color-type">{{node}}</div>' +
    '<div class="col col-67 no-padding color-content">{{nodeValue}}</div>' +
    '</div>' +
    '<div class="row no-padding">' +
    '<div class="col col-33 no-padding color-type">{{submit}}</div>' +
    '<div class="col col-67 no-padding color-content">{{submitPerson}}</div>' +
    '</div>' +
    '</div>' +
    '<div class="col col-10 no-padding col-center workflow-list-select">' +
    '<img src="img/workflow/select@3x.png"/>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</a>',
    controller: ["$scope", function ($scope) {
    }],
    link: function (scope, element, attrs) {

    }
  }
});
