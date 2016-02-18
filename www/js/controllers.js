angular.module('starter.controllers', ['textAngular'])

  .controller('AppCtrl', function ($http, $scope, $ionicModal, $timeout, $stateParams, $state, $cookieStore, $window) {

    // Logout user
    $scope.logout = function () {
      $cookieStore.remove("userInfo");
      $state.go('app.savings');
      $window.location.reload();
    };

    $scope.user = $cookieStore.get('userInfo');

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };


    /**
     * SOCIAL LOGIN
     * Facebook and Google
     */
      // FB Login
    $scope.fbLogin = function () {
      FB.login(function (response) {
        if (response.authResponse) {
          getUserInfo();
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      }, {scope: 'email,user_photos,user_videos'});

      function getUserInfo() {
        // get basic info
        FB.api('/me', function (response) {
          console.log('Facebook Login RESPONSE: ' + angular.toJson(response));
          // get profile picture
          FB.api('/me/picture?type=normal', function (picResponse) {
            console.log('Facebook Login RESPONSE: ' + picResponse.data.url);
            response.imageUrl = picResponse.data.url;
            // store data to DB - Call to API
            // Todo
            // After posting user data to server successfully store user data locally
            var user = {};
            user.name = response.name;
            user.email = response.email;
            user.provider = 'facebook';
            if (response.gender) {
              response.gender.toString().toLowerCase() === 'male' ? user.gender = 'M' : user.gender = 'F';
            } else {
              user.gender = '';
            }
            user.profilePic = picResponse.data.url;
            $cookieStore.put('userInfo', user);
            $scope.modal.hide();
            $window.location.reload();
          });
        });
      }
    };
    // END FB Login



  })


  .controller('SavingsCtrl', function ($http, $scope, $window, $timeout, $cookieStore) {

    $scope.user = $cookieStore.get('userInfo');
    console.log($scope.user);

    $scope.openSaving = function (saving) {

      $window.open(saving.link);


    };

    $http.get('http://www.saveme.ie/api/savings').success(function (data) {
      $scope.savings = data;

    });


    $scope.refresh = function () {

      $http.get('http://www.saveme.ie/api/savings').success(function (data) {
        $scope.savings = data;

      });

      $timeout(function () {

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');

      }, 1000);
    };

    $scope.productImage = function (saving) {

      var savingURL = saving.urlimage.charAt(0);
      // console.log(savingURL);

      if (savingURL === '.') {

        while (saving.urlimage.charAt(0) === '0')
          saving.urlimage = saving.urlimage.substr(1);

        // console.log('http://www.saveme.ie/'+ saving.urlimage);

        return 'http://www.saveme.ie/' + saving.urlimage;


      } else {

        return saving.urlimage;

      }


    };


  })

  .controller('SavingCtrl', function ($stateParams, $scope, $http, $cookieStore) {

    // $scope.savingUrl = function (saving) {
    //
    //   $scope.savingLink = 'http://saveme.ie/savings/' + $scope.saving._id;
    //   // console.log($scope.savingLink);
    //   return $scope.savingLink;
    //
    // };

    $scope.user = $cookieStore.get('userInfo');

    $scope.productImage = function (saving) {

      var savingURL = saving.urlimage.charAt(0);
      // console.log(savingURL);

      if (savingURL === '.') {

        while (saving.urlimage.charAt(0) === '0')
          saving.urlimage = saving.urlimage.substr(1);

        // console.log('http://www.saveme.ie/'+ saving.urlimage);

        return 'http://www.saveme.ie/' + saving.urlimage;


      } else {

        return saving.urlimage;

      }


    };

    $scope.id = $stateParams.savingId;

    $http.get('http://www.saveme.ie/api/savings/' + $scope.id).success(function (data) {
      $scope.saving = data;
      $scope.priceFormatted = '€' + $scope.saving.price;
      $scope.retailerFormatted = '@ (' + $scope.saving.retailer + ')';
      $scope.savingLink = 'http://saveme.ie/savings/' + $scope.saving._id;

    });

    $http.get('http://www.saveme.ie/posts').success(function (data) {
      $scope.posts = data;

    });


    $scope.productImageSaving = function (saving) {

      console.log(saving);

      var savingURL = $scope.saving.urlimage.charAt(0);
      // console.log(savingURL);

      if (savingURL === '.') {

        while ($scope.saving.urlimage.charAt(0) === '0')
          $scope.saving.urlimage = $scope.saving.urlimage.substr(1);

        // console.log('http://www.saveme.ie/'+ saving.urlimage);

        return 'http://www.saveme.ie/' + $scope.saving.urlimage;


      } else {

        return $scope.saving.urlimage;

      }


    };


  })

  .controller('CouponsCtrl', function ($scope) {
    $scope.coupons = [
      {title: 'Reggae1', id: 1},
      {title: 'Chill2', id: 2},
      {title: 'Dubstep3', id: 3},
      {title: 'Indie4', id: 4},
      {title: 'Rap5', id: 5},
      {title: 'Cowbell6', id: 6}
    ];
  })

  .controller('CouponCtrl', function ($scope, $stateParams) {
  })

  .controller('LoginCtrl', function ($scope, $state, $cookieStore, $http) {

  });




