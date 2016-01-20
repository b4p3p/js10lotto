var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/estrazioni');

    $stateProvider
        .state('estrazioni', {
            url: '/estrazioni',
            templateUrl: '/views/pages/estrazioni.ejs',
            controller: 'estrazioniCtrl'
        })
        .state('sist-somma', {
            url: '/sist-somma',
            templateUrl: '/views/pages/sist-somma.ejs',
            controller: 'sistSommaCtrl'
        })
});