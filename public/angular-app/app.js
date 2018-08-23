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

    .when('/chapter/:id', {
        templateUrl: 'angular-app/chapters/chapters.html',
        controller: ChaptersController,
        controllerAs: 'vm',
        access:{
            restricted: false
        }
    })

    .when('/chapter/:id/formulary/:index', {
        templateUrl: 'angular-app/formulary/formulary.html',
        controller: FormularyController,
        controllerAs: 'vm',
        access:{
            restricted: false
        }
    })
    .when('/register', {
        templateUrl: 'angular-app/register/register.html',
        controller: RegisterController,
        controllerAs: 'vm',
        access:{
          restricted: false
        }
        //css: ['angular-app/register/register.css']
      })
      .when('/login', {
        templateUrl: 'angular-app/login/login.html',
        controller: LoginController,
        controllerAs: 'vm',
        access:{
          restricted: false
        }
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

