angular.module('finalProject')
  .controller('UsersIndexController', UsersIndexController)
  .controller('UsersShowController', UsersShowController)
  .controller('UsersEditController', UsersEditController)
  .controller('HomeController', HomeController);


UsersIndexController.$inject = ['User'];
function UsersIndexController(User) {
  const usersIndex = this;

  usersIndex.all = User.query();
}
HomeController.$inject = ['Home'];
function HomeController(Home) {
  const home = this;

  home.all = Home.query();
}



UsersShowController.$inject = ['User', '$state', '$auth'];
function UsersShowController(User, $state, $auth) {
  const usersShow = this;
  usersShow.user = User.get($state.params);

  function deleteUser() {
    usersShow.user.$remove(() => {
      $state.go('usersIndex');
    });
  }
  usersShow.delete = deleteUser;
  usersShow.isLoggedIn = $auth.isAuthenticated;

  function isCurrentUser() {
    return $auth.getPayload().id === parseFloat($state.params.id);
  }

  usersShow.isCurrentUser = isCurrentUser;
}

UsersEditController.$inject = ['User', '$state'];
function UsersEditController(User, $state) {
  const usersEdit = this;
  usersEdit.user = User.get($state.params);

  function update() {
    usersEdit.user.$update(() => {
      $state.go('usersShow', $state.params);
    });
  }
  this.update = update;
}
