angular.module('finalProject')
  .controller('FeedbacksIndexController', FeedbacksIndexController)
  // .controller('FeedbacksNewController', FeedbacksNewController)
  .controller('FeedbacksShowController', FeedbacksShowController);

FeedbacksIndexController.$inject = ['Feedback'];
function FeedbacksIndexController(Feedback) {
  const feedbacksIndex = this;

  feedbacksIndex.all = Feedback.query();
}

FeedbacksShowController.$inject = ['Feedback', '$state', '$auth'];
function FeedbacksShowController(Feedback, $state, $auth) {
  const feedbacksShow = this;
  feedbacksShow.feedback = Feedback.get($state.params);


  feedbacksShow.isLoggedIn = $auth.isAuthenticated;

  function isCurrentFeedback() {
    return $auth.getPayload().id === parseFloat($state.params.id);
  }

  feedbacksShow.isCurrentFeedback = isCurrentFeedback;
}
