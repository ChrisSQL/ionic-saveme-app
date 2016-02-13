angular.module('starter.controllers', ['angularMoment'])

.controller('AppCtrl', function($http, $scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $http.get('http://www.saveme.ie/api/savings').success(function (data) {
    $scope.savings = data;

  });

  $scope.productImage = function(saving){

    var savingURL = saving.urlimage.charAt(0);
    console.log(savingURL);

    if(savingURL === '.'){

      while(saving.urlimage.charAt(0) === '0')
        saving.urlimage = saving.urlimage.substr(1);

      console.log('http://www.saveme.ie/'+ saving.urlimage);

      return 'http://www.saveme.ie/'+ saving.urlimage;


    }else{

      return saving.urlimage;

    }


  };

  var currentStart = 0;

  $scope.addSavings = function() {
    for (var i = currentStart; i < currentStart+5; i++) {
      $scope.savings.push({ title: $scope.savings[i].title, id: [i] })
    }

    if ( $scope.savings.length == currentStart ) {
      $scope.moreDataCanBeLoaded = true;
    }

    currentStart += 2;
    $scope.$broadcast('scroll.infiniteScrollComplete')
  };

  $scope.refresh = function() {

    $http.get('http://www.saveme.ie/api/savings').success(function (data) {
      $scope.savings = data;

    });

    $timeout( function() {

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');

    }, 1000);
  };

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('SavingsCtrl', function($http, $scope, $window) {



  $scope.moreDataCanBeLoaded = false;

  $scope.openSaving = function(saving){

    $window.open(saving.link);


  };

  $http.get('http://www.saveme.ie/api/savings').success(function (data) {
    $scope.savings = data;

  });

  var currentStart = 0;

  $scope.addSavings = function() {
    for (var i = currentStart; i < currentStart+5; i++) {
      $scope.savings.push({ title: $scope.savings[i].title, id: [i] })
    }

    if ( $scope.savings.length == currentStart ) {
      $scope.moreDataCanBeLoaded = true;
    }

    currentStart += 2;
    $scope.$broadcast('scroll.infiniteScrollComplete')
  };



  $scope.addSavings();




})

  .controller('SavingCtrl', function($scope, $stateParams) {
  })

  .controller('CouponsCtrl', function($scope) {
    $scope.coupons = [
      { title: 'Reggae1', id: 1 },
      { title: 'Chill2', id: 2 },
      { title: 'Dubstep3', id: 3 },
      { title: 'Indie4', id: 4 },
      { title: 'Rap5', id: 5 },
      { title: 'Cowbell6', id: 6 }
    ];
  })

.controller('CouponCtrl', function($scope, $stateParams) {
});
