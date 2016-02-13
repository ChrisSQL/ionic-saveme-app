// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('saveme', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/sidebar.html',
    controller: 'AppCtrl'
  })

  .state('app.single1', {
      url: '/coupons/:couponId',
      views: {
        'menuContent': {
          templateUrl: 'templates/coupon.html',
          controller: 'CouponCtrl'
        }
      }
    })
    .state('app.coupons', {
      url: '/coupons',
      views: {
        'menuContent': {
          templateUrl: 'templates/coupons.html',
          controller: 'CouponsCtrl'
        }
      }
    })
    .state('app.savings', {
      url: '/savings',
      views: {
        'menuContent': {
          templateUrl: 'templates/savings.html',
          controller: 'SavingCtrl'
        }
      }
    })
  .state('app.single', {
    url: '/savings/:savingId',
    views: {
      'menuContent': {
        templateUrl: 'templates/saving.html',
        controller: 'SavingCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/savings');
});
