/**
 * Created by gusenlin on 16/5/22.
 */

/**
 * @ngdoc directive
 * @name hmsslidecalendar
 * @module ionic
 * @codepen AjgEB
 * @deprecated will be removed in the next Ionic release in favor of the new ion-slides component.
 * Don't depend on the internal behavior of this widget.
 * @delegate ionic.service:$ionicSlideBoxDelegate
 * @restrict E
 * @description
 * The Slide Box is a multi-page container where each page can be swiped or dragged between:
 *
 *
 * @usage
 * ```html
 * <ion-slide-box on-slide-changed="slideHasChanged($index)">
 * </ion-slide-box>
 * ```
 *
 * @param {string=} delegate-handle The handle used to identify this slideBox
 * with {@link ionic.service:$ionicSlideBoxDelegate}.
 * @param {boolean=} does-continue Whether the slide box should loop.
 * @param {boolean=} auto-play Whether the slide box should automatically slide. Default true if does-continue is true.
 * @param {number=} slide-interval How many milliseconds to wait to change slides (if does-continue is true). Defaults to 4000.
 * @param {boolean=} show-pager Whether a pager should be shown for this slide box. Accepts expressions via `show-pager="{{shouldShow()}}"`. Defaults to true.
 * @param {expression=} pager-click Expression to call when a pager is clicked (if show-pager is true). Is passed the 'index' variable.
 * @param {expression=} on-slide-changed Expression called whenever the slide is changed.  Is passed an '$index' variable.
 * @param {expression=} active-slide Model to bind the current slide index to.
 */
angular.module('HmsModule')
  .directive('hmsslidecalendar', [
    '$animate',
    '$timeout',
    '$compile',
    '$ionicHistory',
    '$ionicScrollDelegate',
    function($animate, $timeout, $compile, $ionicHistory, $ionicScrollDelegate) {
      return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
          autoPlay: '=',
          doesContinue: '@',
          slideInterval: '@',
          showPager: '@',
          pagerClick: '&',
          disableScroll: '@',
          onSlideChanged: '&',
          activeSlide: '=?',
          bounce: '@'
        },
        controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {

          console.log("$element[0] " + angular.toJson($element[0]));

          var _this = this;

          function isDefined(value) {return typeof value !== 'undefined';}

          var continuous = $scope.$eval($scope.doesContinue) === true;
          var bouncing = ($scope.$eval($scope.bounce) !== false); //Default to true
          var shouldAutoPlay = isDefined($attrs.autoPlay) ? !!$scope.autoPlay : false;
          var slideInterval = shouldAutoPlay ? $scope.$eval($scope.slideInterval) || 4000 : 0;

          console.log("continuous " + continuous);
          console.log("bouncing " + bouncing);
          console.log("shouldAutoPlay " + shouldAutoPlay);
          console.log("slideInterval " + slideInterval);

          var slider = new ionic.views.calendar({
            el: $element[0],
            auto: slideInterval,
            continuous: continuous,
            startSlide: $scope.activeSlide,
            bouncing: bouncing,
            slidesChanged: function() {
              $scope.currentSlide = slider.currentIndex();

              // Try to trigger a digest
              $timeout(function() {});
            },
            callback: function(slideIndex) {
              $scope.currentSlide = slideIndex;
              $scope.onSlideChanged({ index: $scope.currentSlide, $index: $scope.currentSlide});
              $scope.$parent.$broadcast('slideBox.slideChanged', slideIndex);
              $scope.activeSlide = slideIndex;
              // Try to trigger a digest
              $timeout(function() {});
            },
            onDrag: function() {
              console.log("slider.onDrag ");
              freezeAllScrolls(true);
            },
            onDragEnd: function() {
              console.log("slider.onDragEnd ");
              freezeAllScrolls(false);
            }
          });

          /*function freezeAllScrolls(shouldFreeze) {
            if (shouldFreeze && !_this.isScrollFreeze) {
              $ionicScrollDelegate.freezeAllScrolls(shouldFreeze);

            } else if (!shouldFreeze && _this.isScrollFreeze) {
              $ionicScrollDelegate.freezeAllScrolls(false);
            }
            _this.isScrollFreeze = shouldFreeze;
          }*/

          //slider.enableSlide($scope.$eval($attrs.disableScroll) !== true);

          $scope.$watch('activeSlide', function(nv) {
            console.log("slider.scope.activeSlide ");
            if (isDefined(nv)) {
              slider.slide(nv);
            }
          });

          $scope.$on('slideBox.nextSlide', function() {
            console.log("slider.slideBox.nextSlide ");
            slider.next();
          });

          $scope.$on('slideBox.prevSlide', function() {
            console.log("slider.slideBox.prevSlide ");
            slider.prev();
          });

          $scope.$on('slideBox.setSlide', function(e, index) {
            console.log("slider.slideBox.setSlide ");
            slider.slide(index);
          });

          //Exposed for testing
          this.__slider = slider;

          /*var deregisterInstance = $ionicSlideBoxDelegate._registerInstance(
            slider, $attrs.delegateHandle, function() {
              return $ionicHistory.isActiveScope($scope);
            }
          );*/

          $scope.$on('$destroy', function() {
            console.log("$destroy ");
            //deregisterInstance();
            //slider.kill();
          });

          /*this.slidesCount = function() {
            return slider.slidesCount();
          };

          this.onPagerClick = function(index) {
            $scope.pagerClick({index: index});
          };*/

          $timeout(function() {
            //slider.load();
          });
        }],
        template: '<div class="slider">' +
        '<div class="slider-slides" ng-transclude>' +
        '</div>' +
        '</div>',

        link: function($scope, $element, $attr) {
          // Disable ngAnimate for slidebox and its children
          $animate.enabled($element, false);

          function isDefined(value) {return typeof value !== 'undefined';}

          // if showPager is undefined, show the pager
          /*if (!isDefined($attr.showPager)) {
            $scope.showPager = true;
            getPager().toggleClass('hide', !true);
          }

          $attr.$observe('showPager', function(show) {
            if (show === undefined) return;
            show = $scope.$eval(show);
            getPager().toggleClass('hide', !show);
          });

          var pager;
          function getPager() {
            if (!pager) {
              var childScope = $scope.$new();
              pager = jqLite('<ion-pager></ion-pager>');
              $element.append(pager);
              pager = $compile(pager)(childScope);
            }
            return pager;
          }*/
        }
      };
    }]);

  /*.directive('ionSlide', function() {
    return {
      restrict: 'E',
      require: '?^ionSlideBox',
      compile: function(element) {
        element.addClass('slider-slide');
      }
    };
  })*/
