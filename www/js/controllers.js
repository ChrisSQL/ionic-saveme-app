angular.module('starter.controllers', ['textAngular'])

  .controller('AppCtrl', function ($http, $scope, $ionicModal, $timeout, $stateParams, $state, $cookieStore, $window, $ionicPopup, $localStorage, $sessionStorage) {

    // Logout user
    $scope.logout = function () {
      $scope.storage.$reset();
      $state.go('app.savings');
      $window.location.reload();
    };

    $scope.storage = $localStorage;

    $scope.user = $cookieStore.get('userInfo');

    // Form data for the login modal
    $scope.loginData = {};
    $scope.signupData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Create the signup modal that we will use later
    $ionicModal.fromTemplateUrl('templates/signup.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modalsignup = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Triggered in the login modal to close it
    $scope.closeSignup = function () {
      $scope.modalsignup.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Open the signup modal
    $scope.signup = function () {

      $scope.modal.hide();

      $timeout(function () {
        $scope.modalsignup.show();
      }, 500);




    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {

      // console.log('Doing login', $scope.loginData);
      // alert('Doing login');

      $scope.data = {};
      $scope.data.username = $scope.loginData.username;
      $scope.data.password = $scope.loginData.password;

      // http://www.saveme.ie/api/auth/signin



      $timeout(function () {

          $http.post("http://www.saveme.ie/api/auth/signin", $scope.data).success(function(data1, status) {
            $scope.hello = data1;

            $scope.storage.username = $scope.hello.username;
            $scope.storage.email = $scope.hello.email;
            $scope.storage.provider = 'local';
            $scope.storage.gender = $scope.hello.gender;
            $scope.storage._id = $scope.hello._id;
            $scope.storage.profilePic = $scope.hello.profileImageURL;

            if($scope.hello.profileImageURL.substring(0, 3) === 'mod'){
              $scope.storage.profilePic = 'http://www.saveme.ie/' + $scope.hello.profileImageURL;
            }else if($scope.hello.profileImageURL.substring(0, 6) === '../mod'){
              $scope.storage.profilePic = 'http://www.saveme.ie/' + $scope.storage.profilePic.substring(3);
            }

            $scope.modal.hide();
            $scope.modalsignup.hide();
            // $window.location.reload();

          }).error(function (data, status, header, config) {

            $ionicPopup.alert({
              title: 'Login Incorrect'
            });

          });

      }, 1000);
    };

    // Perform the signup action when the user submits the signup form
    $scope.doSignup = function () {

      // console.log('Doing login', $scope.loginData);
      // alert('Doing Signup');

      $scope.data = {};
      $scope.data.firstName = $scope.signupData.signupFirstName;
      $scope.data.lastName = $scope.signupData.signupSurname;
      $scope.data.email = $scope.signupData.signupEmail;
      $scope.data.username = $scope.signupData.signupUsername;
      $scope.data.password = $scope.signupData.signupPassword;
      // $scope.data.password2 = $scope.signupData.signupPassword2;

      // http://www.saveme.ie/api/auth/signin



      $timeout(function () {

        $http.post("http://www.saveme.ie/api/auth/signup", $scope.data).success(function(data1, status) {
          $scope.hello = data1;

          $scope.loginData.username = $scope.hello.username;
          $scope.loginData.password = $scope.signupData.signupPassword;



          $scope.doLogin();

          $timeout(function () {
          $scope.modalsignup.hide();
          }, 1000);

        }).error(function (data, status, header, config) {

          $ionicPopup.alert({
            title: 'Signup Incorrect'
          });

        });

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
    // console.log($scope.user);

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

  })

.controller('SignupCtrl', function ($scope, $state, $cookieStore, $http) {

});




