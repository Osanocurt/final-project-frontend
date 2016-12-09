angular.module('finalProject')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
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
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'LoginController as login'
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
    .state('home', {
      url: '/home',
      templateUrl: '/templates/home.html',
      controller: 'HomeController as home'
    })
    .state('feedbacksIndex', {
      url: '/feedbacks',
      templateUrl: '/templates/feedbacksIndex.html',
      controller: 'FeedbacksIndexController as feedbacksIndex'
    })
    .state('feedbacksShow', {
      url: '/feedbacks/:id',
      templateUrl: '/templates/feedbacksShow.html',
      controller: 'FeedbacksShowController as feedbacksShow'
    })
    .state('feedbacksEdit', {
      url: '/feedbacks/:id/edit',
      templateUrl: '/templates/feedbacksEdit.html',
      controller: 'FeedbacksEditController as feedbacksEdit'
    });

  $urlRouterProvider.otherwise('/users');
}
