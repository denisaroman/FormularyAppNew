angular.module('formularyapp', ['ngRoute', 'angular-jwt']).config(config).run(run);


function config($httpProvider, $routeProvider){
    $httpProvider.interceptors.push('AuthInterceptor');

    $routeProvider
    .when('/', {
      templateUrl: 'angular-app/homepage/homepage.html',
      controller: HomepageController,
      controllerAs: 'vm'
    })

    .when('/substance', {
      templateUrl: 'angular-app/substance/substance.html',
      controller: HomepageController,
      controllerAs: 'vm'
    })

    .when('/add', {
        templateUrl: 'angular-app/add/add.html',
        controller: AddController,
        controllerAs: 'vm'
      })

    .when('/update/:id', {
        templateUrl: 'angular-app/homepage/chapterupdate.html',
        controller: HomepageController,
        controllerAs: 'vm'
    })

    .when('/chapter/:id', {
        templateUrl: 'angular-app/chapters/chapters.html',
        controller: ChaptersController,
        controllerAs: 'vm'
    })

    .when('/update/:chapterId/formulary/:listId', {
      templateUrl: 'angular-app/chapters/categoryupdate.html',
      controller: CategoryUpdateController,
      controllerAs: 'vm'
    })

    .when('/chapter/:chapterId/formulary/:listId/:index', {
      //.when('/chapter/:chapterId/formulary/:index', {
        templateUrl: 'angular-app/formulary/formulary.html',
        controller: FormularyController,
        controllerAs: 'vm'
    })

    .when('/chapter/:chapterId/formulary/:listId/:index/:subcategoryId', {
      templateUrl: 'angular-app/formulary/formularyupdate.html',
      controller: FormularyUpdateController,
      controllerAs: 'vm'
  })

    .when('/chapter/:chapterId/formulary/:listId/:index/:subcategoryId/:medicineGroupId', {
      templateUrl: 'angular-app/formulary/medicineupdate.html',
      controller: FormularyUpdateController,
      controllerAs: 'vm'
})

  .when('/chapter/:chapterId/formulary/:listId/:index/:subcategoryId/:medicineGroupId/:substanceId', {
    templateUrl: 'angular-app/formulary/substancesupdate.html',
    controller: FormularyUpdateController,
    controllerAs: 'vm'
})

.when('/chapter/:chapterId/formulary/:listId/:index/:subcategoryId/:medicineGroupId/:substanceId/:detailsId', {
  templateUrl: 'angular-app/formulary/brandupdate.html',
  controller: FormularyUpdateController,
  controllerAs: 'vm'
})

    .when('/register', {
        templateUrl: 'angular-app/register/register.html',
        controller: RegisterController,
        controllerAs: 'vm'
      })

    .when('/login', {
        templateUrl: 'angular-app/login/login.html',
        controller: LoginController,
        controllerAs: 'vm'
      });
    }

    function run($rootScope, $location, $window, AuthFactory) {
        $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
          if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
            event.preventDefault();
            $location.path('/');
          }
        });
      }

