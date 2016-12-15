// Ionic Starter App
var LoginModule = angular.module('LoginModule', []);
var HmsModule = angular.module('HmsModule', []);//汉得公用模块库
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services', 'ion-alpha-scroll','ion-affix','baseConfig', 'HmsModule', 'ngCordova', 'LoginModule',
  'starter.mail',
  'starter.contact',
  'starter.workFlow',
  'starter.myInfo'
])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
    $ionicConfigProvider.backButton.previousTitleText(true).text('');
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'loginCtrl'
      })
      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        controller: 'TabsCtrl'
      })
      // Each tab has its own nav history stack:
      .state('tab.mail', {
        url: '/mail',
        views: {
          'tab-mail': {
            templateUrl: 'app/mail/mail.html',
            controller: 'MailCtrl'
          }
        }
      })
      .state('tab.mail-detail', {
        url: '/mail',
        views: {
          'tab-mail': {
            templateUrl: 'app/mail/mailDetail.html',
            controller: 'MailDetailCtrl'
          }
        }
      })
      .state('tab.contact', {
        url: '/contact',
        views: {
          'tab-contact': {
            templateUrl: 'app/contact/contact.html',
            controller: 'ContactCtrl'
          }
        }
      })
      .state('tab.workFlow', {
        url: '/workFlow',
        views: {
          'tab-workFlow': {
            templateUrl: 'app/workFlow/workFlow.html',
            controller: 'WorkFlowCtrl'
          }
        }
      })
      .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })
      .state('tab.myInfo', {
        url: '/myInfo',
        views: {
          'tab-myInfo': {
            templateUrl: 'app/myInfo/myInfo.html',
            controller: 'MyInfoCtrl'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

  });
