angular.module('finalProject')
  .controller('RequestsIndexController', RequestsIndexController)
  // .controller('RequestsNewController', RequestsNewController)
  .controller('RequestsShowController', RequestsShowController);

RequestsIndexController.$inject = ['Request'];
function RequestsIndexController(Request) {
  const requestsIndex = this;

  requestsIndex.all = Request.query();
}

RequestsShowController.$inject = ['Request', '$state', '$auth'];
function RequestsShowController(Request, $state, $auth) {
  const requestsShow = this;
  requestsShow.request = Request.get($state.params);


  requestsShow.isLoggedIn = $auth.isAuthenticated;

  function isCurrentRequest() {
    return $auth.getPayload().id === parseFloat($state.params.id);
  }

  requestsShow.isCurrentRequest = isCurrentRequest;
}
