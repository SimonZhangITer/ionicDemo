/**
 * Created by zhangren on 16/6/27.
 */
'use strict';
angular.module('starter.contact', ['ionic', 'ion-affix'])
    .controller('ContactCtrl', function ($scope, $state,$ionicModal, Contacts) {
        console.log('contactCtrl');
        $scope.contacts = Contacts.all();
        $scope.goDetail = function (x) {
            Contacts.setDetail(x);
            $state.go('tab.contact-detail');
        };
        $scope.create = function () {
            $scope.createModal.show();
        };
        $scope.tel = function (e) {
            window.location.href = "tel:18516766466";
            e.stopPropagation();
        };
        $ionicModal.fromTemplateUrl('app/contact/createContact.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.createModal = modal;
        });
    })
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('tab.contact-detail', {
                    url: '/contact-detail',
                    views: {
                        'tab-contact': {
                            templateUrl: 'app/contact/my-info-detail.html',
                            controller: 'ContactDetailCtrl'
                        }
                    }
                })
                .state('tab.contact-create', {
                    url: '/contact-create',
                    views: {
                        'tab-contact': {
                            templateUrl: 'app/contact/createContact.html',
                            controller: 'ContactCreateCtrl'
                        }
                    }
                })
        }])
    .controller('ContactDetailCtrl', [
        '$scope',
        '$ionicHistory',
        'Contacts',
        function ($scope,
                  $ionicHistory,
                  Contacts) {

            $scope.personalInfo = Contacts.getDetail();
            console.log($scope.personalInfo);
            $scope.goBack = function () {//返回按钮
                $ionicHistory.goBack();
            }
        }])
    .controller('ContactCreateCtrl', [
        '$scope',
        '$ionicHistory',
        'Contacts',
        function ($scope,
                  $ionicHistory,
                  Contacts) {

        }])
    .factory('Contacts', function () {
        // Some fake testing data
        var contacts = [
            {
                id: 0,
                name: 'Aen Sparrow',
                address: '123 Fake St.',
                face: 'img/adam.jpg'
            }, {
                id: 0,
                name: 'Aen Sparrow',
                address: '123 Fake St.',
                face: 'img/ben.png'
            }, {
                id: 0,
                name: 'Aen Sparrow',
                address: '123 Fake St.',
                face: 'img/adam.jpg'
            }, {
                id: 1,
                name: 'Bax Lynx',
                address: '123 Fake St.',
                face: 'img/max.png'
            }, {
                id: 2,
                name: 'Cdam Bradleyson',
                address: '123 Fake St.',
                face: 'img/max.png'
            }, {
                id: 3,
                name: 'Derry Governor',
                address: '123 Fake St.',
                face: 'img/mike.png'
            }, {
                id: 4,
                name: 'Dike Harrington',
                address: '123 Fake St.',
                face: 'img/perry.png'
            }, {
                id: 5,
                name: 'Fike Harrington',
                address: '123 Fake St.',
                face: 'img/adam.jpg'
            }, {
                id: 5,
                name: 'Fike Harrington',
                address: '123 Fake St.',
                face: 'img/max.png'
            }, {
                id: 5,
                name: 'Fike Harrington',
                address: '123 Fake St.',
                face: 'img/mike.png'
            }, {
                id: 6,
                name: 'Gike Harrington',
                address: '123 Fake St.',
                face: 'img/perry.png'
            }, {
                id: 7,
                name: 'Gike Harrington',
                address: '123 Fake St.',
                face: 'img/adam.jpg'
            }, {
                id: 8,
                name: 'Hike Harrington',
                address: '123 Fake St.',
                face: 'img/ben.png'
            }, {
                id: 9,
                name: 'Mike Harrington',
                address: '123 Fake St.',
                face: 'img/mike.png'
            }, {
                id: 10,
                name: 'Nike Harrington',
                address: '123 Fake St.',
                face: 'img/adam.jpg'
            }, {
                id: 11,
                name: 'Zike Harrington',
                address: '123 Fake St.',
                face: 'img/ben.png'
            }

        ];
        var detail = {};
        return {
            all: function () {
                return contacts;
            },
            remove: function (contact) {
                contacts.splice(contacts.indexOf(contact), 1);
            },
            get: function (contactId) {
                for (var i = 0; i < contacts.length; i++) {
                    if (contacts[i].id === parseInt(contactId)) {
                        return contacts[i];
                    }
                }
                return null;
            },
            setDetail: function (x) {
              detail = x;
            },
            getDetail: function () {
                return detail;
            }
        };
    });
