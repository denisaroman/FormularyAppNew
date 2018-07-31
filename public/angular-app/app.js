angular.module('formularyapp', ['ngRoute']).config(config)


function config($routeProvider){
    $routeProvider
    .when('/', {
      templateUrl: 'angular-app/homepage/homepage.html',
      controller: HomepageController,
      controllerAs: 'vm'
    })

    .when('/chapter/:id', {
        templateUrl: 'angular-app/chapters/chapters.html',
        controller: ChaptersController,
        controllerAs: 'vm'
    })

    .when('/chapter/:id/formulary/:index', {
        templateUrl: 'angular-app/formulary/formulary.html',
        controller: FormularyController,
        controllerAs: 'vm'
    });

    /*.when('/admin', {
        templateUrl:'angular-app/admin/admin.html',
        controller: AdminController,
        controllerAs: 'vm'
    });*/
}

