angular.module('finalProject')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'LoginController as login'
    })
    .state('usersIndex', {
      url: '/users',
      templateUrl: '/templates/usersIndex.html',
      controller: 'UsersIndexController as usersIndex'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: 'RegisterController as register'
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: '/templates/usersShow.html',
      controller: 'UsersShowController as usersShow'
    })
    .state('usersEdit', {
      url: '/users/:id/edit',
      templateUrl: '/templates/usersEdit.html',
      controller: 'UsersEditController as usersEdit'
    })
    .state('feedbacksIndex', {
      url: '/feedbacks',
      templateUrl: '/templates/feedbacksIndex.html',
      controller: 'FeedbacksIndexController as feedbacksIndex'
    })
    .state('feedbacksNew', {
      url: '/feedbacks/new',
      templateUrl: '/templates/feedbacksNew.html',
      controller: 'FeedbacksNewController as feedbacksNew'
    })
    .state('feedbacksShow', {
      url: '/feedbacks/:id',
      templateUrl: '/templates/feedbacksShow.html',
      controller: 'FeedbacksShowController as feedbacksShow'
    })
    .state('requestsIndex', {
      url: '/requests',
      templateUrl: '/templates/requestsIndex.html',
      controller: 'RequestsIndexController as requestsIndex'
    })
    .state('requestsNew', {
      url: '/requests/new',
      templateUrl: '/templates/requestsNew.html',
      controller: 'RequestsNewController as requestsNew'
    })
    .state('requestsShow', {
      url: '/requests/:id',
      templateUrl: '/templates/requestsShow.html',
      controller: 'RequestsShowController as requestsShow'
    })
    .state('track', {
      url: '/track',
      templateUrl: '/templates/track.html'
    })
    .state('map', {
      url: '/map',
      templateUrl: '/templates/map.html'
    });
  $urlRouterProvider.otherwise('/users');
}
