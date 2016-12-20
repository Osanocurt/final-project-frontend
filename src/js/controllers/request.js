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
  const currentUserId = $auth.getPayload().id;

  requestsIndex.all = Request.query();
  console.log(requestsIndex.all);

  function canShowAcceptButton(request) {
    return request.customer.id !== currentUserId && !request.job_accepted;
  }
  requestsIndex.canShowAcceptButton = canShowAcceptButton;

  function accept(request) {
    Request.accept({id: request.id}, (requestAccepted) => {
      console.log(requestAccepted.id + ' was accepted');
      requestsIndex.all = Request.query();
    });
  }
  requestsIndex.accept = accept;

  function canShowDeliverButton(request) {

    return request.customer.id !== currentUserId &&
      request.job_accepted &&
      !request.delivered &&
      request.runner &&
      request.runner.id === currentUserId;
  }
  requestsIndex.canShowDeliverButton = canShowDeliverButton;

  function deliver(request) {
    Request.deliver({ id: request.id}, (deliveredRequest) => {
      console.log('request delivered:', deliveredRequest);
      requestsIndex.all = Request.query();
    });
  }
  requestsIndex.deliver = deliver;

  function canShowFeedbackButton(request) {
    const feedbackCustomerIds = request.feedbacks.map((feedback) => {
      return feedback.customer_id;
    });

    return request.customer.id === currentUserId && request.delivered && !feedbackCustomerIds.includes(currentUserId);
  }
  requestsIndex.canShowFeedbackButton = canShowFeedbackButton;
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
    console.log('RequestsShowController: $auth.getPayload():', $auth.getPayload());
    return $auth.getPayload().id;
  }

  requestsShow.currentUser = currentUser;
  requestsShow.isCurrentRequest = isCurrentRequest;


}
