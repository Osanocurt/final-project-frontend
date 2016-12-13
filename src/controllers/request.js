angular.module('finalProject')
  .controller('RequestsIndexController', RequestsIndexController)
  .controller('RequestsNewController', RequestsNewController)
  .controller('RequestsShowController', RequestsShowController);



RequestsNewController.$inject = ['Request', '$state', '$auth'];
function RequestsNewController(Request, $state, $auth) {
  const requestsNew = this;
  requestsNew.request = {};

  function createRequest() {
    console.log('Going to try to save: ', requestsNew.request);
    Request.save(requestsNew.request);
    $state.go('requestsIndex');
  }

  function itemDelivered() {
    console.log('Hi Curtis!!');
  }
  requestsNew.itemDelivered = itemDelivered;
  requestsNew.createRequest = createRequest;
  requestsNew.isLoggedIn = $auth.isAuthenticated;
}

RequestsIndexController.$inject = ['Request', '$state', '$auth'];
function RequestsIndexController(Request, $state, $auth) {
  const requestsIndex = this;

  requestsIndex.all = Request.query();

  function accept(request) {
    request.$accept(() => {
      console.log(request.id + ' was accepted');
      $state.reload();
    });
  }
  requestsIndex.accept = accept;

  function decline(request) {
    request.$decline(() => {
      console.log(decline.id + ' was declined');
      $state.reload();
    });
  }
  requestsIndex.decline = decline;

  function currentUser() {
    return $auth.getPayload().id;
  }
  requestsIndex.currentUser = currentUser;

}


RequestsShowController.$inject = ['Request', '$state', '$auth'];
function RequestsShowController(Request, $state, $auth) {
  const requestsShow = this;
  requestsShow.request = Request.get($state.params);


  requestsShow.isLoggedIn = $auth.isAuthenticated;

  function isCurrentRequest() {
    return $auth.getPayload().id === parseFloat($state.params.id);
  }

  function currentUser() {
    return $auth.getPayload().id;
  }
  requestsShow.currentUser = currentUser;
  requestsShow.isCurrentRequest = isCurrentRequest;


}
