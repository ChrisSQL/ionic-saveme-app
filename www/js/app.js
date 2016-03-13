// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('saveme', ['ngCookies', 'ionic', 'starter.controllers', 'angulike', 'services', 'ngStorage'])

.run(function($ionicPlatform, $rootScope, $cookieStore, $state, $localStorage, $sessionStorage, $window) {


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

    .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl'
        }

      }
    })

    .state('app.signup', {
      url: '/signup',
      views: {
        'menuContent': {
          templateUrl: 'templates/signup.html',
          controller: 'SignupCtrl'
        }

      }
    })

    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
          controller: 'ProfileCtrl'
        }

      }
    })

  .state('app.coupon', {
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
          controller: 'SavingsCtrl'
        }

      }
    })
  .state('app.saving', {
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



