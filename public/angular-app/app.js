angular.module('formularyapp', ['ngRoute', 'angular-jwt']).config(config)


function config($routeProvider){
    $routeProvider
    .when('/', {
      templateUrl: 'angular-app/homepage/homepage.html',
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

    /*.when('/admin', {
        templateUrl:'angular-app/admin/admin.html',
        controller: AdminController,
        controllerAs: 'vm'
    });*/
}

