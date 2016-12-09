"use strict";function Auth(e,t){e.loginUrl=t+"/login",e.signupUrl=t+"/register",e.tokenPrefix=""}function RegisterController(e,t){function r(){e.signup(o.user).then(function(){t.go("login")})}var o=this;o.user={},o.submit=r}function LoginController(e,t){function r(){e.login(o.credentials).then(function(){t.go("usersIndex")})}var o=this;o.credentials={},o.submit=r}function FeedbacksIndexController(e){var t=this;t.all=e.query()}function FeedbacksShowController(e,t,r){function o(){n.feedback.$remove(function(){t.go("feedbacksIndex")})}function l(){return r.getPayload().id===parseFloat(t.params.id)}var n=this;n.feedback=e.get(t.params),n.delete=o,n.isLoggedIn=r.isAuthenticated,n.isCurrentFeedback=l}function FeedbacksEditController(e,t){function r(){o.feedback.$update(function(){t.go("feedbacksShow",t.params)})}var o=this;o.feedback=e.get(t.params),this.update=r}function Feedback(e,t){return new e(t+"/feedbacks/:id",{id:"@id"},{update:{method:"PUT"}})}function MainController(e,t,r){function o(){e.logout().then(function(){t.go("usersIndex")})}function l(r,o,l){(!e.isAuthenticated()&&s.includes(o.name)||"usersEdit"===o.name&&parseFloat(l.id)!==e.getPayload().id)&&(r.preventDefault(),t.go("login"))}var n=this;n.isLoggedIn=e.isAuthenticated,n.message=null;var s=["usersEdit"];r.$on("$stateChangeStart",l),n.logout=o}function Router(e,t){e.state("usersIndex",{url:"/users",templateUrl:"/templates/usersIndex.html",controller:"UsersIndexController as usersIndex"}).state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("usersShow",{url:"/users/:id",templateUrl:"/templates/usersShow.html",controller:"UsersShowController as usersShow"}).state("usersEdit",{url:"/users/:id/edit",templateUrl:"/templates/usersEdit.html",controller:"UsersEditController as usersEdit"}).state("home",{url:"/home",templateUrl:"/templates/home.html",controller:"HomeController as home"}).state("feedbacksIndex",{url:"/feedbacks",templateUrl:"/templates/feedbacksIndex.html",controller:"FeedbacksIndexController as feedbacksIndex"}).state("feedbacksShow",{url:"/feedbacks/:id",templateUrl:"/templates/feedbacksShow.html",controller:"FeedbacksShowController as feedbacksShow"}).state("feedbacksEdit",{url:"/feedbacks/:id/edit",templateUrl:"/templates/feedbacksEdit.html",controller:"FeedbacksEditController as feedbacksEdit"}),t.otherwise("/users")}function UsersIndexController(e){var t=this;t.all=e.query()}function HomeController(e){var t=this;t.all=e.query()}function UsersShowController(e,t,r){function o(){n.user.$remove(function(){t.go("usersIndex")})}function l(){return r.getPayload().id===parseFloat(t.params.id)}var n=this;n.user=e.get(t.params),n.delete=o,n.isLoggedIn=r.isAuthenticated,n.isCurrentUser=l}function UsersEditController(e,t){function r(){o.user.$update(function(){t.go("usersShow",t.params)})}var o=this;o.user=e.get(t.params),this.update=r}function User(e,t){return new e(t+"/users/:id",{id:"@id"},{update:{method:"PUT"}})}angular.module("finalProject",["ngResource","ui.router","satellizer"]).constant("API_URL","http://localhost:3000/api").config(Auth),Auth.$inject=["$authProvider","API_URL"],angular.module("finalProject").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("finalProject").controller("FeedbacksIndexController",FeedbacksIndexController).controller("FeedbacksShowController",FeedbacksShowController).controller("FeedbacksEditController",FeedbacksEditController),FeedbacksIndexController.$inject=["Feedback"],FeedbacksShowController.$inject=["Feedback","$state","$auth"],FeedbacksEditController.$inject=["Feedback","$state"],angular.module("finalProject").factory("Feedback",Feedback),Feedback.$inject=["$resource","API_URL"],angular.module("finalProject").controller("MainController",MainController),MainController.$inject=["$auth","$state","$rootScope"],angular.module("finalProject").config(Router),Router.$inject=["$stateProvider","$urlRouterProvider"],angular.module("finalProject").controller("UsersIndexController",UsersIndexController).controller("UsersShowController",UsersShowController).controller("UsersEditController",UsersEditController).controller("HomeController",HomeController),UsersIndexController.$inject=["User"],HomeController.$inject=["Home"],UsersShowController.$inject=["User","$state","$auth"],UsersEditController.$inject=["User","$state"],angular.module("finalProject").factory("User",User),User.$inject=["$resource","API_URL"];
//# sourceMappingURL=app.js.map
