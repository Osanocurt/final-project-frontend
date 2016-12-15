angular.module('finalProject')
  .controller('UsersIndexController', UsersIndexController)
  .controller('UsersShowController', UsersShowController)
  .controller('UsersEditController', UsersEditController);


UsersIndexController.$inject = ['User'];
function UsersIndexController(User) {
  const usersIndex = this;

  usersIndex.all = User.query();
}

UsersShowController.$inject = ['User', '$state', '$auth'];
function UsersShowController(User, $state, $auth) {
  const usersShow = this;
  User.get({ id: $state.params.id }, (user) => {
    usersShow.user = user;

    console.log(user);

    usersShow.isRunner = user.user_type === 'Runner';
    usersShow.isCustomer = user.user_type === 'Customer';
  });

  function deleteUser() {
    usersShow.user.$remove(() => {
      $auth.logout()
      .then(() => {
        $state.go('landing');
      });
    });
  }

  usersShow.loggedInUserId = $auth.getPayload().id;
  usersShow.delete = deleteUser;
  usersShow.isLoggedIn = $auth.isAuthenticated;

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
