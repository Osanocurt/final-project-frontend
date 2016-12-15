angular.module('finalProject')
  .controller('PicturesAfterController', PicturesAfterController);

PicturesAfterController.$inject = ['User', '$auth', '$state'];
function PicturesAfterController(User, $auth, $state) {

  const picturesAfter = this;

  User.get({ id: $auth.getPayload()._id }, (user) => {
    picturesAfter.user = user;
  });

  function save() {
    User.update({ id: picturesAfter.user._id, image: 'after' }, picturesAfter.user, () => {
      $state.go();
    });
  }

  picturesAfter.save = save;
}
